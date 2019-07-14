import React, { Component } from "react";
import PropTypes from "prop-types";

import ProductCarousel from "./ProductCarousel";
import ProductEditPanel from "./ProductEditPanel";
import ProductTile from "./ProductTile";
import { styleService } from "../services";

class StyleEditPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      style: {},
      look: {
        selectedTag: {
          index: -1,
        },
        tags : [],
      },
    };
  }

  reset = () => {
    const state = { ...this.state };
    state.look.isChanged = false;
    this.setState(state);
  }

  addTag = () => {
    console.log("adding tag");
    const state = { ...this.state };
    state.look.tags.push({
      "coor_x" : 0,
      "coor_y" : 0,
      "product" : {
        "url": "",
        "title": "",
        "price": "",
      }
    })
    this.setState(state);
    this.saveStyle();
    this.selectTag(state.look.tags.length-1);
  }

  selectTag = (index) => {
    const state = { ...this.state };
    if (index < 0 ) {
      state.look.selectedTag.hasSelected = false;
      state.look.selectedTag.index = -1;
    } else {
      state.look.selectedTag.hasSelected = true;
      state.look.selectedTag.index = index;
    }
    this.setState(state);
    console.log("selected tag: " + index);
  }

  removeTag = (index) => {
    const state = { ...this.state };
    if (state.look.tags[index]) {
      state.look.tags.splice(index, 1);
    }
    state.look.isChanged |= true;
    this.setState(state);

    this.selectTag(-1);
  }

  saveTag = (index, product) => {
    console.log(product);
    const state = { ...this.state };
    state.look.tags[index].product = product;
    state.look.isChanged |= true;
    this.setState(state);

    this.selectTag(-1);
  }


  changeDescription = (e) => {
    const { name, value } = e.target;
    const state = { ...this.state };
    state.look.description = value;
    state.look.isChanged |= true;
    this.setState(state);
  }

  removeStyle = () => {
    const lookId = this.state.look.id;
    styleService.removeMyStyle(lookId)
      .then(() => {
        this.props.history.push('/console');
      })
      .catch(e => {
        console.log("cannot remove look:" + e);
      })
  }

  saveStyle = () => {
    const lookId = this.state.look.id;
    styleService.updateMyStyle(lookId, this.state.look);
    console.log("saving look")
    this.selectTag(-1);
    this.reset();
  }

  publishStyle = () => {
    console.log("publish look");
    console.log(this.state.look);
    this.selectTag(-1);
  }

  componentDidMount() {
    const styleId = this.props.match.params.id;
    console.log(styleId);
    styleService.getStyle(styleId)
      .then(
        style => {
          this.setState({ style: style, look: styleService.styleModelToData(style)})
          console.log("after mount: ");
          console.log(this.state.look);
        }
      )
      .catch(e => {
        console.log("error" + e);
        this.props.history.push('/welcome');
      });
  }

  render() {
    const imageStyle = {
      width: "200px",
    }
    const sectionStyle = {
        padding: "1rem 1rem"
    }
    const lookContainerStyle = {
        maxWidth: "960px",
        width: "100%",
    }
    const lookImageStyle = {
        width: "100%",
        borderRadius: "5px",
    };
    const lookCardStyle = {
        borderRadius: "5px",
    }
    const editComponentStyle = {
      padding: "5px",
    }
    const inputBoxStyle = {
      height: "150px",
    }
    const imageTemplateStyle = {
      minHeight: "500px",
      border: "4px dotted rgb(240 240 240)",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    }
    return (
      <div>
        <div className="section columns is-centered is-marginless" style={sectionStyle}>
          <div className="columns container is-centered is-widescreen is-marginless" style={lookContainerStyle}>
            <div className="column is-5">
                <div className="card" style={lookCardStyle}>
                  {this.state.look.image ?
                    <img className="is-block container" style={lookImageStyle} src={this.state.look.image}></img> :
                    <div style={imageTemplateStyle}>
                      <div className="button">
                        Add Your New Look
                      </div>
                    </div>
                  }
                </div>
            </div>
            <div className="column is-7">
              <div className="has-text-weight-bold">Tag your look:</div> 
              <div>
                {this.state.look.tags.map((tag, index)=>{
                  if (index == this.state.look.selectedTag.index) {
                  return (
                    <div key={index} style={editComponentStyle}>
                      <ProductEditPanel product={tag.product} remove={()=>{this.removeTag(index)}} save={(product)=>{this.saveTag(index, product)}} cancel={()=>{this.selectTag(-1)}} />
                    </div>
                  )
                  }
                  return (
                    <div key={index} style={editComponentStyle}>
                      <ProductTile product={tag.product} index={index} islinked={false} clickHandler={()=>{this.selectTag(index)}}/>
                    </div>
                  )
                })}
                {this.state.look.selectedTag.index < 0 &&
                    <div style={editComponentStyle}>
                      <div className="button is-link is-outlined"  onClick={this.addTag}>Add New Tag</div>
                    </div>
                }
              </div>

              <div className="has-text-weight-bold">Describe your look:</div>
              <div style={editComponentStyle}>
                <textarea style={inputBoxStyle} className="input" value={this.state.look.description} onChange={this.changeDescription} required />
              </div>
              <div style={editComponentStyle} className="level">
                <div className="level-left">
                  <button className="button is-danger is-outlined" onClick={this.removeStyle}>Remove</button>
                </div>
                <div className="level-right buttons">
                  {this.state.look.isChanged ? 
                    <button className="button" onClick={this.saveStyle}>Save as Draft</button> :
                    <button className="button" onClick={this.saveStyle} disabled>Saved</button>}
                  <button className="button is-success is-outlined" onClick={this.publishStyle}>Publish</button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <br></br>
        <div>Presentation Data</div>
        <div><pre>{JSON.stringify(this.state.look, null, 2)}</pre></div>
        <div>Raw Data</div>
        <div><pre>{JSON.stringify(this.state.style, null, 2)}</pre></div>
      </div>
    )
  }
}
export default StyleEditPage;