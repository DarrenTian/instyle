import React, { Component } from "react";
import PropTypes from "prop-types";

import ProductCarousel from "./ProductCarousel";
import ProductEditPanel from "./ProductEditPanel";
import ProductTile from "./ProductTile";
import { userLookService } from "../services";
import { lookUtil } from "../services";

class LookEditPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      look: {},
      view : {
        selectedTag : {
          index : -1,
        }
      }
    };
  }

  reset = () => {
    const state = { ...this.state };
    state.view.isChanged = false;
    this.setState(state);
  }

  updateLook = (updatedLook) => {
    const state = { ...this.state };
    state.look = updatedLook;
    this.setState(state);
  }

  setImage = (e) => {
    const data = new FormData() ;
    data.append('file', e.target.files[0]);
    userLookService.setUserLookImage(this.state.look.id, data)
      .then((updatedLook) => {
        this.updateLook(updatedLook);
      });
  }

  addTag = () => {
    const state = { ...this.state };
    const coverLookImage = lookUtil.getCoverLookImage(state.look);
    coverLookImage.tags.push({
      "coor_x" : 0,
      "coor_y" : 0,
      "product" : {
        "url": "",
        "title": "",
        "price": "",
      }
    })
    state.view.isChanged = true;
    this.setState(state);
    this.selectTag(coverLookImage.tags.length-1);
  }

  selectTag = (index) => {
    const state = { ...this.state };
    if (index < 0 ) {
      state.view.selectedTag.hasSelected = false;
      state.view.selectedTag.index = -1;
    } else {
      state.view.selectedTag.hasSelected = true;
      state.view.selectedTag.index = index;
    }
    this.setState(state);
  }

  removeTag = (index) => {
    const state = { ...this.state };
    const coverLookImage = lookUtil.getCoverLookImage(state.look);
    if (coverLookImage.tags[index]) {
      coverLookImage.tags.splice(index, 1);
    }
    state.view.isChanged = true;
    this.setState(state);

    this.selectTag(-1);
  }

  saveTag = (index, product) => {
    const state = { ...this.state };
    const coverLookImage = lookUtil.getCoverLookImage(state.look);
    coverLookImage.tags[index].product = product;
    state.view.isChanged = true;
    this.setState(state);

    this.selectTag(-1);
  }


  changeDescription = (e) => {
    const { name, value } = e.target;
    const state = { ...this.state };
    state.look.description = value;
    state.view.isChanged = true;
    this.setState(state);
  }

  removeStyle = () => {
    const lookId = this.state.look.id;
    userLookService.destroyUserLook(lookId)
      .then(() => {
        this.props.history.push('/console');
      })
      .catch(e => {
        console.log("cannot remove look:" + e);
      })
  }

  saveStyle = () => {
    const lookId = this.state.look.id;
    const state = { ...this.state };
    state.look.publish_status = 'D';
    userLookService.updateUserLook(lookId, this.state.look)
      .then((updatedLook) => {
        this.updateLook(updatedLook);
      })
      .catch((e) => {
        console.log("saving style failed" + e);
      });
    this.selectTag(-1);
    this.reset();
  }

  publishStyle = () => {
    const lookId = this.state.look.id;
    const state = { ...this.state };
    state.look.publish_status = 'P';
    userLookService.updateUserLook(lookId, state.look)
      .then((updatedLook) => {
        this.updateLook(updatedLook);
      })
      .catch((e) => {
        console.log("publishing style failed" + e);
      });
    this.selectTag(-1);
    this.reset();
  }

  goToLook = () => {
    this.props.history.push('./');
  }

  componentDidMount() {
    const lookId = this.props.match.params.id;
    userLookService.retrieveUserLook(lookId)
      .then(
        look => {
          const view = {
            view : {
              selectedTag : {
                index : -1,
              },
              isChanged: false
            }
          }
          const lookView = { ...look, ...view }
          this.setState({look: lookView})
        }
      )
      .catch(e => {
        console.log("error" + e);
        //this.props.history.push('/welcome');
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
    const image = lookUtil.getCoverImage(this.state.look);
    const tags = lookUtil.getTags(this.state.look);
    return (
      <div>
        <div className="section columns is-centered is-marginless" style={sectionStyle}>
          <div className="columns container is-centered is-widescreen is-marginless" style={lookContainerStyle}>
            <div className="column is-5">
                <div className="card" style={lookCardStyle}>
                  {image ?
                    <img className="is-block container" style={lookImageStyle} src={image}></img> :
                    <div style={imageTemplateStyle}>
                      <div className="file has-name is-boxed">
                        <label className="file-label">
                          <input className="file-input" type="file" name="resume" onChange={this.setImage} />
                          <span className="file-cta">
                            <span className="file-icon">
                              <i className="fas fa-upload"></i>
                            </span>
                            <span className="file-label">
                              Choose a look image file
                            </span>
                          </span>
                        </label>
                      </div>
                    </div>
                  }
                </div>
            </div>
            <div className="column is-7">
              <div className="has-text-weight-bold">Tag your look:</div> 
              <div>
                {tags && tags.map((tag, index)=>{
                  if (index == this.state.view.selectedTag.index) {
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
                <div style={editComponentStyle}>
                  <div className="button is-link is-outlined"  onClick={this.addTag}>Add New Tag</div>
                </div>
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
                  {this.state.view.isChanged ? 
                    <button className="button" onClick={this.saveStyle}>Save as Draft</button> :
                    <button className="button" disabled>Saved</button>}
                  {this.state.look.publish_status=='D' ?
                    <button className="button is-success is-outlined" onClick={this.publishStyle}>Publish</button> :
                    <button className="button is-success is-outlined" disabled>Published</button>
                  }
                  {this.state.look.publish_status=='P' &&
                    <button className="button is-success is-outlined" onClick={this.goToLook}>Go to Look</button>
                  }
                </div>
              </div>
            </div>
          </div>
        </div>
        { process.env.PROD_ENV == "DEV" && <div><pre>{JSON.stringify(this.state.look, null, 2)}</pre></div> }
      </div>
    )
  }
}
export default LookEditPage;