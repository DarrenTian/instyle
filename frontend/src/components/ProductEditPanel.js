import React from "react";
import PropTypes from "prop-types";

class ProductEditPanel extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            "product" : this.props.product,
        };
      }


    handleChange = (e) => {
        const { name, value } = e.target;
        this.setState({"product": { [name]: value}});
        console.log(this.state);
    }

    save = () => {
        this.props.save(this.state.product);   
    }

	render() {
		const itemStyle = {
			backgroundColor: "white",
			boxShadow: "0 2px 3px rgba(10, 10, 10, 0.1), 0 0 0 1px rgba(10, 10, 10, 0.1)",
            width: "210px",
            borderRadius: "5px",
            backgroundColor: "#F8F8F8",
            display: "inline-block",
            height: "70px",
            marginRight: "10px",
        };
        const mediaBoxStyle = {
        	width: "100%",
        }
        const titleStyle = {
            textOverflow: "ellipsis",
            whiteSpace: "nowrap",
            overflow: "hidden",
            width: "100%",
        }
        const priceStyle = {
        	textOverflow: "ellipsis",
            whiteSpace: "nowrap",
            overflow: "hidden",
            width: "120px",
        }
        const imageStyle = {
        	height: "70px",
        	borderRadius: "5px",
        }
        const contentStyle = {
        	height: "70px",
        	display: "flex",
        	flexDirection: "column",
        	justifyContent: "space-between",
        	padding: "10px 10px 10px 10px",
        	width:"100%"
        }
        const product = this.props.product;
        const islinked = this.props.isLinked ? true : false;
        const linkUrl = islinked ? product.url : null;
        const hasImage = this.props.product.image_url == "";
		return (
			<div>
                <div>
                    <div className="field">
                      <label className="label">Product Title</label>
                      <div className="control">
                        <input type="text" placeholder="" className="input" name="title" defaultValue={this.props.product.title} onChange={this.handleChange} required />
                      </div>
                    </div>
                    <div className="field">
                      <label className="label">Price</label>
                      <div className="control">
                        <input type="text" placeholder="" className="input" name="price" defaultValue={this.props.product.price} onChange={this.handleChange} required />
                      </div>
                    </div>
                    <div className="field">
                      <label className="label">Product Link</label>
                      <div className="control">
                        <input type="text" placeholder="" className="input" name="url" defaultValue={this.props.product.url} onChange={this.handleChange} required />
                      </div>
                    </div>
                    <button className="button" onClick={this.props.remove}>Remove</button>
                    <button className="button" onClick={this.save}>Save</button>
                    <button className="button" onClick={this.props.cancel}>Cancel</button>
                </div>
            </div>
		)
	}

}

export default ProductEditPanel