import React, {Component} from 'react'
import Order from './Order'
import {Link} from "react-router-dom";
import axios from "axios";

class OrdersBlock extends Component {

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
                <div>
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
                    <br/>
                    {this.state.notice}
                    <br/>
                    <button onClick={this.createBlankOrder}>Create new order</button>
                    <br/><br/>
                    <Link to="/">To the main page</Link>
                </div>
            )
        } else {
            window.location.href = '/';
        }
        return null
    }
}

export default OrdersBlock