import React from "react";
import PropTypes from "prop-types";

import MediaQuery from 'react-responsive';
import { lookUtil } from "services";
import LookTile from "components/element/LookTile";
import Mansory from 'react-masonry-component';

class LookList extends React.Component {
    // state = {
    //   loaded: false,
    // }

    // show = ()=>{
    //   this.setState({loaded: true});
    // }

    render() {
        const publisher = lookUtil.getPublisher(this.props.looks);
        if (this.props.title && this.props.title=="MORE_LOOKS" && publisher==null) {
          return null;
        }

        const masonryOptions = {
            transitionDuration: 0
        };

        return (
          <div>
            <div> 
              <section className="section tiles-section">
                  {this.props.title && this.props.title=="MORE_LOOKS" &&
                    <div className="is-size-6 has-text-weight-semibold" style={{padding:"0px 0 10px 0px"}}>
                         More Looks from {publisher.nickname}
                    </div>
                  }
                  {this.props.title && this.props.title=="FOLLOWING" && this.props.looks.length==0 &&
                    <div className="is-size-6 has-text-weight-semibold" style={{padding:"0px 0 10px 0px"}}>
                         Starting following trending Eastylers!
                    </div>
                  }
                  <Mansory  disableImagesLoaded={false} 
                            options={masonryOptions}
                            onImagesLoaded={this.show} >
                      {this.props.looks && this.props.looks.map((look,index)=>{
                        const image = lookUtil.getCoverImage(look);
                        if (image==null) { return null}
                        return (
                          <React.Fragment key={index} >
                              <LookTile {...this.props} look={look}/>
                          </React.Fragment>
                        )
                      })}  
                  </Mansory>
                </section>
            </div>
            <div>
                { process.env.PROD_ENV == "DEV" && <div><pre>{JSON.stringify(this.props.looks, null, 2)}</pre></div> }            
            </div>
          </div>
        )
    }

};
export default LookList;