import React, {Component} from 'react'
import axios from 'axios'
import defaultImage from 'images/default_image.png'
import {Redirect} from "react-router-dom";

class Product extends Component {
    constructor(props) {
        super(props);
        this.deleteProduct = this.deleteProduct.bind(this);
        //this.editProduct = this.editProduct.bind(this);
    }

    deleteProduct(productId) {
        if (window.confirm('Are you sure?')) {
            axios
                .delete(`/api/products/${productId}`)
                .then((response) => {
                    if (response.status === 204) {
                        window.location.reload();
                    }
                })
                .catch((error) => {
                    console.log(error);
                });
        }
    }

    render() {
        return (
            <div className="product">
                {this.props.product.name}<br/>
                {this.props.product.description}<br/>
                <b>{this.props.product.price}$</b><br/>
                {this.props.product.image_url != null ? (
                    <div style={{backgroundImage: 'url(' + this.props.product.image_url + ')'}}
                         className="product_image"/>
                ) : (
                    <div style={{backgroundImage: 'url(' + defaultImage + ')'}} className="product_image"/>
                )}
                <br/>
                {this.props.user && this.props.user.role === 1 && (
                    <div>
                        <a onClick={() => this.deleteProduct(this.props.product.id)} className="button_link">Delete product</a>
                        <br/>
                        <a href={'/edit_product/' + this.props.product.id} className="button_link">Edit product</a>
                    </div>
                )}
            </div>
        )
    }
}

export default Product