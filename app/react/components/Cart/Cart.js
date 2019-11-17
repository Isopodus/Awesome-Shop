import React, {Component} from 'react'
import CartItem from "./CartItem/CartItem";
import {Link} from "react-router-dom";
import axios from "axios";
import Header from "../Header/Header";

class Cart extends Component {

    constructor(props) {
        super(props);
        this.state = {
            notice: null
        };
        this.saveOrder = this.saveOrder.bind(this);
        this.confirmOrder = this.confirmOrder.bind(this);
        this.setActive = this.setActive.bind(this);
    }

    confirmOrder(e) {
        if (this.props.order.products.length > 0) {
            this.saveOrder(e, () => {
                axios
                    .get('/api/orders/confirm_order/' + this.props.order.order_id)
                    .then(response => {
                        if (response.status === 200) {
                            window.location.reload();
                            //console.log(response);
                        } else {
                            alert("Unexpected error occurred");
                            window.location.href = '/';
                        }
                    })
                    .catch(error => {
                        console.log(error);
                    });
            });
        } else {
            this.setState({
                notice: <p>You can not confirm an empty order!</p>
            })
        }
    }

    saveOrder(e, confirmCallback) {
        if (this.props.order.products.length > 0) {
            axios
                .post('/api/orders/', {order: this.props.order})
                .then((response) => {
                    if (response.status === 200) {
                        if (confirmCallback) {
                            confirmCallback();
                        } else {
                            this.setState({
                                notice: <p>Order saved successfully</p>
                            });
                            this.setActive(response.data.order_id);
                        }
                    } else {
                        alert("Unexpected error occurred");
                        window.location.href = '/';
                    }
                })
                .catch((error) => {
                    console.log(error);
                    this.setState({
                        notice: <p>Unexpected error, order was not saved</p>
                    });
                });
        } else {
            this.setState({
                notice: <p>You can not save an empty order!</p>
            })
        }
    }

    setActive(id) {
        axios
            .get('/users/set_active_order/' + id)
            .then(response => {
                if (response.status === 200) {
                    window.location.reload();
                    //console.log(response.data);
                } else {
                    alert("Unexpected error occurred");
                    window.location.href = '/';
                }
            })
            .catch(error => {
                console.log(error);
            });
    }

    render() {
        if (this.props.user) {

            // Check if this order is active
            if (this.props.order.status === 0) {
                let itemsRendered;
                let total = 0;
                if (this.props.order.products.length > 0) {
                    itemsRendered = this.props.order.products.map((item) => {
                        total += item.quantity * item.product.price;
                        return (
                            <CartItem
                                itemData={item}
                                order={this.props.order}
                                orderHandler={this.props.orderHandler}
                                key={item.product.id}
                            />
                        )
                    });
                } else {
                    itemsRendered = <tr>
                        <td colSpan="6">Your cart is empty</td>
                    </tr>
                }
                return (
                    <div className="cart_container">
                        <Header
                            user={this.props.user}
                            order={this.props.order}/>
                        <div className="wrapper">
                            {this.props.order.order_id ? (
                                <h3>Order ID: {this.props.order.order_id}</h3>
                            ) : (
                                <h3>Order</h3>
                            )}
                            <table className="cart_table">
                                <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>Name</th>
                                    <th>Quantity</th>
                                    <th>Unit price</th>
                                    <th>Summary price</th>
                                    <th>Action</th>
                                </tr>
                                </thead>
                                <tbody>
                                {itemsRendered}
                                </tbody>
                            </table>
                        </div>
                        <br/>
                        {this.state.notice}
                        <h2>Total: {Math.round(total * 100) / 100}$</h2>
                        <a className="link" onClick={this.saveOrder}>Save order</a>
                        <a className="link" onClick={this.confirmOrder}>Confirm order</a>
                        <br/><br/><br/>
                        <Link className="link" to="/">To the main page</Link>
                    </div>
                )
            } else {
                return (
                    <div className="cart_container">
                        <Header
                            user={this.props.user}
                            order={this.props.order}/>
                        <h2>You have no active order chosen</h2>
                        <br/>
                        <Link className="link" to="/account/orders">My orders</Link>
                        <br/><br/><br/>
                        <Link className="link" to="/">To the main page</Link>
                    </div>
                )
            }
        } else {
            window.location.href = '/';
        }
        return null
    }
}

export default Cart