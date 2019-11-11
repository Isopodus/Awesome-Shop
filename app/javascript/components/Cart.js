import React, {Component} from 'react'
import OrderItem from "./OrderItem";
import {Link} from "react-router-dom";
import axios from "axios";

class Cart extends Component {

    constructor(props) {
        super(props);
        this.state = {
            notice: null
        };
        this.saveOrder = this.saveOrder.bind(this);
        this.confirmOrder = this.confirmOrder.bind(this);
    }

    confirmOrder() {
        axios
            .get('/api/orders/confirm_order/' + this.props.order.id)
            .then(response => {
                if (response.status === 200) {
                    window.location.reload();
                    //console.log(response.data);
                }
            });
    }

    saveOrder() {
        // Build payload
        let payload = {
            order: {
                id: this.props.order.id,
                user_id: this.props.order.user_id,
                order_items: this.props.order.order_items
            }
        };
        // Send order
        axios
            .post('/api/orders/', payload)
            .then((response) => {
                if (response.status === 200) {
                    this.setState({
                        notice: <p>Order saved successfully</p>
                    });
                }
            })
            .catch((error) => {
                console.log(error);
                this.setState({
                    notice: <p>Unexpected error, order was not saved</p>
                });
            });
    }

    render() {
        if (this.props.user) {
            // Check if user has items in cart
            if (this.props.order.order_items.length > 0 && this.props.order.status === 0) {
                let total = 0;
                const itemsRendered = this.props.order.order_items.map((item) => {
                    total += item.quantity * item.product.price;
                    return (
                        <OrderItem
                            itemData={item}
                            key={item.product.id}
                        />
                    )
                });
                return (
                    <div>
                        <table className="cart_table">
                            <thead>
                            <tr>
                                <th>ID</th>
                                <th>Name</th>
                                <th>Quantity</th>
                                <th>Unit price</th>
                                <th>Summary price</th>
                            </tr>
                            </thead>
                            <tbody>
                            {itemsRendered}
                            </tbody>
                        </table>
                        <br/>
                        {this.state.notice}
                        <h2>Total: {Math.round(total * 100) / 100}$</h2>
                        <button onClick={this.saveOrder}>Save order</button>
                        <br/><br/>
                        <button onClick={this.confirmOrder}>Confirm order</button>
                        <br/><br/>
                        <Link to="/">To the main page</Link>
                    </div>
                )
            } else {
                return (
                    <div>
                        <h3>You currently have no items in your cart</h3><br/>
                        <Link to="/">To the main page</Link>
                    </div>
                );
            }
        } else {
            window.location.href = '/';
        }
        return null
    }
}

export default Cart