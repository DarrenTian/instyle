import React, { Component } from "react";
import PropTypes from "prop-types";

import ProductCarousel from "components/ProductCarousel";
import ProductEditPanel from "components/ProductEditPanel";
import ProductTile from "components/ProductTile";
import ActionModal from "components/ActionModal";
import { userLookService } from "services";
import { lookUtil } from "services";

class LookEditPage extends Component {
  constructor(props) {
    super(props);
    this.tagContainer = React.createRef();

    this.state = {
      look: {},
      view : {
        selectedTag : {
          index : -1,
        },
        isUploading : false,
        confirmDelete : false,
        hintPublish : false,
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
    const state = { ...this.state };
    state.view.isUploading=true;
    this.setState(state);

    const data = new FormData() ;
    data.append('file', e.target.files[0]);
    userLookService.setUserLookImage(this.state.look.url_id, data)
      .then((updatedLook) => {
        this.updateLook(updatedLook);
        const state = { ...this.state };
        state.view.isUploading=false;
        this.setState(state);
      });
  }

  addTag = () => {
    const state = { ...this.state };
    const coverLookImage = lookUtil.getCoverLookImage(state.look);
    coverLookImage.tags.push({
      "coor_x" : "0.50",
      "coor_y" : "0.50",
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
    if (index < 0 || state.view.selectedTag.index==index) {
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

  confirmRemoveStyle = () => {
    const state = { ...this.state };
    state.view.confirmDelete = true;
    this.setState(state);
  }

  cancelDelete = () => {
    const state = { ...this.state };
    state.view.confirmDelete = false;
    this.setState(state);
  }

  hintPublish = () => {
    const state = { ...this.state };
    state.view.hintPublish = true;
    this.setState(state);
  }

  cancelHintPublish = () => {
    const state = { ...this.state };
    state.view.hintPublish = false;
    this.setState(state);
  }

  removeStyle = () => {
    const lookId = this.state.look.url_id;
    userLookService.destroyUserLook(lookId)
      .then(() => {
        this.props.history.push('/console');
      })
      .catch(e => {
        console.log("cannot remove look:" + e);
      })
  }

  saveStyle = () => {
    const lookId = this.state.look.url_id;
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
    const lookId = this.state.look.url_id;
    const state = { ...this.state };
    state.look.publish_status = 'P';
    userLookService.updateUserLook(lookId, state.look)
      .then((updatedLook) => {
        this.updateLook(updatedLook);
        this.hintPublish();
      })
      .catch((e) => {
        console.log("publishing style failed" + e);
      });
    this.selectTag(-1);
    this.reset();
  }

  goToLook = () => {
    var win = window.open("./", '_blank');
    win.focus();
  }

  updateLookImage = (e) => {
    this.forceUpdate();
  }

  drag = (e) => {
  }

  move = (e) => {
    const target = e.target;
    target.style.display = "none";
  }

  drop = (e, tagIndex) => {
    // This is not smooth enough, figure out how to make it smooth
    const target = e.target;
    const bounding = this.tagContainer.current.getBoundingClientRect();
    const shiftX = e.pageX - bounding.left -10;
    const shiftY = e.pageY - bounding.top -10;
    if (shiftX > 0 && shiftX < bounding.width &&
      shiftY > 0 && shiftY < bounding.height) {
      target.style.left = (e.pageX - bounding.left -10) +"px";
      target.style.top = (e.pageY - bounding.top -10) +"px";
    }
    target.style.display = "block";
    // update tag coor
    const coor_x = shiftX / bounding.width;
    const coor_y = shiftY / bounding.height;
    const state = { ...this.state };
    const tags = lookUtil.getTags(state.look);
    tags[tagIndex].coor_x = this.boundCoor(coor_x);
    tags[tagIndex].coor_y = this.boundCoor(coor_y);
    state.view.isChanged = true;
    this.setState(state);
    this.selectTag(-1);
  }

  boundCoor = (coor) => {
    console.log(coor);
    if (coor < 0.05) {
      return 0.05;
    }
    if (coor > 0.90) {
      return 0.90;
    }
    return coor;
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
          // !!!Anti-pattern, this is to be able to access the rendered
          // tag container so that we can calculate tag's offset
          // based on percentage.
          this.forceUpdate();
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
    const tagContainerStyle = {
      position: "relative",
    }
    const tagStyle = {
      position: "absolute",
      backgroundColor: "gray",
      borderRadius: "50%",

      height: "20px",
      width: "20px",
    }
    const dotStyle = {
      position: "absolute",
      backgroundColor: "white",
      borderRadius: "50%",
      left: "5px",
      top: "5px",
      height: "10px",
      width: "10px",
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
                    <div style={tagContainerStyle} ref={this.tagContainer}>
                      <img className="is-block container" style={lookImageStyle} src={image} onLoad={this.updateLookImage}></img>
                      {tags && tags.map((tag, index)=> {
                        const singleTagStyle = {...tagStyle};
                        if (this.tagContainer.current) {
                          singleTagStyle.left = tag.coor_x * this.tagContainer.current.clientWidth + "px";
                          singleTagStyle.top = tag.coor_y * this.tagContainer.current.clientHeight + "px";
                        }
                        return (
                          <div className="is-blink" key={index} style={singleTagStyle} draggable="true" onDragStart={(e)=>this.drag(e)} onDrag={this.move} onDragEnd={(e)=>this.drop(e, index)} onClick={()=>this.selectTag(index)}>
                            <div style={dotStyle}></div>
                          </div>
                        )
                      })}
                    </div>
                     :
                    <div style={imageTemplateStyle}>
                      {this.state.view.isUploading ? 
                        <div className="button is-loading" style={{width:"100px", borderColor:"white"}}></div>
                        :
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
                      }
 
                    </div>
                  }
                </div>
                {image ? 
                  <div style={{"padding":"10px"}}>
                    <div className="file has-name" style={{"justifyContent":"center"}}>
                      {this.state.view.isUploading ? 
                        <div className="button is-loading" style={{width:"100px"}}></div>
                        :
                        <label className="file-label">
                          <input className="file-input" type="file" name="resume" onChange={this.setImage} />
                          <span className="file-cta">
                            <span className="file-icon">
                              <i className="fas fa-upload"></i>
                            </span>
                            <span className="file-label">
                              Replace Image
                            </span>
                          </span>
                        </label>
                      }
                    </div> 
                  </div>
                  : null}
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
                 {image ?       
                    <div className="button is-link is-outlined" onClick={this.addTag}>Add New Tag</div>     
                    :       
                    <div className="button is-link is-outlined" disabled onClick={this.addTag}>Add New Tag</div>
                 }
                </div>
              </div>

              <div className="has-text-weight-bold">Describe your look:</div>
              <div style={editComponentStyle}>
                <textarea style={inputBoxStyle} className="input" placeholder="What is your mood wearing the look?" value={this.state.look.description} onChange={this.changeDescription} required />
              </div>
              <div style={editComponentStyle} className="level">
                <div className="level-left">
                  <button className="button is-danger is-outlined" onClick={this.confirmRemoveStyle}>Remove</button>
                </div>
                <div className="level-right buttons">
                  {this.state.view.isChanged ? 
                    <button className="button" onClick={this.saveStyle}>Save as Draft</button> :
                    <button className="button" disabled>Saved</button>}
                  {this.state.look.publish_status=='D' ?
                    <button className="button is-success is-outlined" onClick={this.publishStyle}>Publish</button> :
                    <button className="button is-success is-outlined" disabled>Published</button>
                  }
                  {(this.state.look.publish_status=='P' && !this.state.view.isChanged) &&
                    <button className="button is-success is-outlined" onClick={this.goToLook}>Go to Look</button>
                  }
                </div>
              </div>
            </div>
          </div>
        </div>
        { process.env.PROD_ENV == "DEV" && <div><pre>{JSON.stringify(this.state.look, null, 2)}</pre></div> }
        <ActionModal  isActive={this.state.view.confirmDelete} 
                      title="Are you sure to delete the look?"
                      action="Delete"
                      actionHandler={this.removeStyle} 
                      cancelHandler={this.cancelDelete}/>
        <ActionModal  isActive={this.state.view.hintPublish} 
                      title="Congrats on publishing your new look!"
                      action="View Your Look"
                      actionHandler={()=>{this.goToLook();this.cancelHintPublish();}} 
                      cancelHandler={this.cancelHintPublish}/>  
      </div>
    )
  }
}
export default LookEditPage;