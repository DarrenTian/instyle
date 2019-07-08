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
        tags : [],
      },
    };
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
    this.setState(state);

    this.selectTag(-1);
  }

  saveTag = (index, product) => {
    console.log(product);
    const state = { ...this.state };
    state.look.tags[index].product = product;
    this.setState(state);

    this.selectTag(-1);
  }


  changeDescription = (e) => {
    const { name, value } = e.target;
    const state = { ...this.state };
    state.look.description = value;
    this.setState(state);
  }

  saveStyle = () => {
    console.log("saving look")
    console.log(this.state.look);
    this.selectTag(-1);
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
          console.log("after mount" 
            + this.state.look);
                    console.log(this.state.look);
        }
      )
      .catch(e => {
        console.log(e);
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
    }
    const lookImageStyle = {
        width: "100%",
        borderRadius: "5px",
    };
    const timeStyle = {
        fontWeight: "normal",
        color: "#A9A9A9",
        display: "flex",
        justifyContent: "flex-end",

    };
    const socialPluginStyle = {
        display: "flex",
        justifyContent: "flex-end",
        padding: "10px 10px 10px 10px",
    }
    const productCarouselStyle = {
        padding: "10px 10px 10px 10px",
    }
    const lookCardStyle = {
        borderRadius: "5px",
    }
    const publisherCardStyle = {
        borderRadius: "5px",
        padding: "15px 15px 15px 15px",
    }
    return (
      <div>
        <div className="section columns is-centered is-marginless" style={sectionStyle}>
          <div className="columns container is-centered is-widescreen" style={lookContainerStyle}>
            <div className="column is-5">
                <div className="card" style={lookCardStyle}>
                    <img className="is-block container" style={lookImageStyle} src={this.state.look.image}></img>
                </div>
            </div>
            <div className="column is-7">
              <div>Tag your look:</div> 
              <div>
              {this.state.look.tags.map((tag, index)=>{
                if (index == this.state.look.selectedTag.index) {
                return (
                  <div key={index}>
                    <ProductEditPanel product={tag.product} remove={()=>{this.removeTag(index)}} save={(product)=>{this.saveTag(index, product)}} cancel={()=>{this.selectTag(-1)}} />
                  </div>
                )
                }
                return (
                  <div key={index} onClick={()=>{this.selectTag(index)}}>
                    <ProductTile product={tag.product} index={index} islinked={false}/>
                  </div>
                )
              })}
              </div>
              <div className="button" onClick={this.addTag}>Add New Tag</div>
              <div>Describe your look:</div>
              <input type="text" placeholder="Your email address" className="input" name="username" defaultValue={this.state.look.description} onChange={this.changeDescription} required />
              <button className="button" onClick={this.saveStyle}>Save as Draft</button>
              <button className="button" onClick={this.publishStyle}>Publish</button>
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