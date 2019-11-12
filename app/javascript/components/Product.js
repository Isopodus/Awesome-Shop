import React, {Component} from 'react'
import axios from 'axios'
import defaultImage from 'images/default_image.png'
import {Link} from "react-router-dom";

class Product extends Component {
    constructor(props) {
        super(props);
        this.state = {
            quantity: 1
        };
        this.deleteProduct = this.deleteProduct.bind(this);
        this.addToCart = this.addToCart.bind(this);
        this.handleQuantity = this.handleQuantity.bind(this);
    }

    handleQuantity(event) {
        this.setState({quantity: event.target.value});
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
                        <a onClick={() => this.deleteProduct(this.props.product.id)} className="button_link">Delete
                            product</a>
                        <br/>
                        <Link to={'/edit_product/' + this.props.product.id} className="button_link">Edit product</Link>
                    </div>
                )}
                {this.props.user.checked_order_id != null &&
                <>
                    <input type="number" min="1" max="100" defaultValue="1" onChange={this.handleQuantity}/>
                    <a onClick={() => this.addToCart(
                        this.props.product.id,
                        this.props.product.name,
                        this.props.product.description,
                        Number(this.state.quantity),
                        Number(this.props.product.price))
                    } className="button_link">Add to cart</a>
                </>
                }
            </div>
        )
    }
}

export default Product