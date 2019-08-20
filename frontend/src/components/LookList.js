import React from "react";
import PropTypes from "prop-types";

import MediaQuery from 'react-responsive';
import { lookUtil } from "../services";
import ImageTile from "./ImageTile";

class LookList extends React.Component {
    render() {
        const publisher = lookUtil.getPublisher(this.props.looks);
        if (publisher==null) {
          return null;
        }

        return (
          <div>
            <div> 
              <section className="section tiles-section">
                  {this.props.title && this.props.title=="MORE_LOOKS" &&
                    <div className="is-size-6 has-text-weight-semibold" style={{padding:"0px 0 10px 0px"}}>
                         More Looks from {publisher.nickname}
                    </div>
                  }
                  <div className="tiles-vertical-columns">
                      {this.props.looks && this.props.looks.map((look,index)=>{
                        const image = lookUtil.getCoverImage(look);
                        if (image==null) { return null}
                        return (

                          <React.Fragment key={index} >
                              <ImageTile look={look}/>
                          </React.Fragment>
                        )
                      })}
                  </div>
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