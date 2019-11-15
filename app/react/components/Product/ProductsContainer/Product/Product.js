import React, {Component} from 'react'
import axios from 'axios'
import defaultImage from 'images/default_image.png'
import {Link} from "react-router-dom";

class Product extends Component {
    constructor(props) {
        super(props);
        this.state = {
            style: this.props.isInCart ? {background: "#428d46"} : null
        };
        this.deleteProduct = this.deleteProduct.bind(this);
        this.addToCart = this.addToCart.bind(this);
    }

    deleteProduct(productId) {
        if (window.confirm('Are you sure?')) {
            axios
                .delete(`/api/products/${productId}`)
                .then((response) => {
                    if (response.status === 204) {
                        this.props.reloadProducts();
                    }
                })
                .catch((error) => {
                    console.log(error);
                });
        }
    }

    addToCart(id, name, description, quantity, price) {
        if (this.props.user) {
            let item = {
                quantity: quantity,
                product: {
                    id: id,
                    name: name,
                    description: description,
                    price: price
                }
            };
            let oldOrder = this.props.order;
            let oldItem = oldOrder.products.find(currItem => currItem.product.id === item.product.id);
            if (oldItem) {
                oldOrder.products[oldOrder.products.findIndex(obj => obj === oldItem)].quantity += item.quantity;
            } else {
                oldOrder.products.push(item);
            }

            this.props.orderHandler(oldOrder);
        } else {
            window.location.href = 'users/sign_in';
        }
    }

    render() {
        return (
            <div className="product" style={this.state.style}>
                {this.props.product.image_url != null ? (
                    <div style={{backgroundImage: 'url(' + this.props.product.image_url + ')'}}
                         className="product_image"/>
                ) : (
                    <div style={{backgroundImage: 'url(' + defaultImage + ')'}} className="product_image"/>
                )}
                <h3>{this.props.product.name}</h3>
                {this.props.product.description}<br/><br/>
                <p className="price">{this.props.product.price}$</p><br/>
                {this.props.user && this.props.user.role === 1 && (
                    <div>
                        <a onClick={() => this.deleteProduct(this.props.product.id)} className="link">Delete
                            product</a>
                        <br/><br/><br/>
                        <Link to={'/edit_product/' + this.props.product.id} className="link">Edit product</Link>
                        <br/><br/><br/>
                    </div>
                )}
                {this.props.user && this.props.user.checked_order_id != null &&
                <>
                    <a onClick={() => this.addToCart(
                        this.props.product.id,
                        this.props.product.name,
                        this.props.product.description,
                        1,
                        Number(this.props.product.price))
                    } className="link">Add to cart</a>
                </>
                }
            </div>
        )
    }
}

export default Product