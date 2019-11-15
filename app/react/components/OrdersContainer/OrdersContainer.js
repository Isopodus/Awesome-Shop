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
        this.createBlankOrder = this.createBlankOrder.bind(this);
        this.setNotice = this.setNotice.bind(this);
    }

    createBlankOrder() {
        axios
            .post('/api/orders', {
                order: {
                    order_id: null,
                    user_id: this.props.user.id,
                    status: 0,
                    products: [{quantity: null, product: {id: null}}]
                },
            })
            .then(response => {
                //console.log(response.data)
                window.location.reload();
            })
            .catch(error => {
                console.log(error);
            })
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
                    <a className="link" onClick={this.createBlankOrder}>Create new order</a>
                    <br/><br/><br/>
                    <Link className="link" to="/">To the main page</Link>
                    <br/><br/><br/>
                </div>
            )
        } else {
            window.location.href = '/';
        }
        return null
    }
}

export default OrdersContainer