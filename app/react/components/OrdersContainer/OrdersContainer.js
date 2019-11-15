import React, {Component} from 'react'
import Order from './Order/Order'
import {Link} from "react-router-dom";
import axios from "axios";
import Header from "../Header/Header";

class OrdersContainer extends Component {

    constructor(props) {
        super(props);
        this.state = {
            notice: null
        };
        this.setNotice = this.setNotice.bind(this);
    }

    setNotice(notice) {
        this.setState({notice: notice})
    }

    render() {
        if (this.props.user) {
            const ordersRendered = this.props.user.orders.map((order) => {
                return (
                    <Order
                        user={this.props.user}
                        orderData={order}
                        setNotice={this.setNotice}
                        key={order.order_id}
                    />
                )
            });
            return (
                <div className="orders_container">
                    <Header
                        user={this.props.user}
                        order={this.props.order}/>
                    <div className="wrapper">
                        <h3 className="orders_header">Orders</h3>
                        <table className="orders_table">
                            <thead>
                            <tr>
                                <th>ID</th>
                                <th>Created at</th>
                                <th>Status</th>
                                <th>Items count</th>
                                <th>Total</th>
                                <th>Action</th>
                            </tr>
                            </thead>
                            <tbody>
                            {ordersRendered}
                            </tbody>
                        </table>
                    </div>
                    <br/>
                    {this.state.notice}
                    <br/>
                    <Link className="link" to="/">To the main page</Link>
                </div>
            )
        } else {
            window.location.href = '/';
        }
        return null
    }
}

export default OrdersContainer