import React, {Component} from 'react'
import Order from './Order'
import {Link} from "react-router-dom";
import axios from "axios";

class OrdersBlock extends Component {

    constructor(props) {
        super(props);
        // this.state = {
        //     orders: [],
        //     loaded: false
        // };
        this.createBlankOrder = this.createBlankOrder.bind(this);
    }

    createBlankOrder() {
        axios
            .post('/api/orders', {user_id: this.props.user.id})
            .then(response => {
                //console.log(response.data)
                window.location.reload();
            })
            .catch(error => {
                console.log(error);
            })
    }

    // componentDidMount() {
    //     let productsIds = [];
    //     this.props.user.orders.forEach(order => {
    //         order.order_items.forEach(item => {
    //             productsIds.push(item.product_id);
    //         })
    //     });
    //     axios
    //         .get('/api/products', {
    //             params: {
    //                 ids: productsIds
    //             }
    //         })
    //         .then(response => {
    //             this.setState((state, props) => ({
    //                 orders: props.user.orders.map((order) => {
    //                     return {
    //                         id: order.id,
    //                         status: order.status,
    //                         user_id: order.user_id,
    //                         order_items: order.order_items.map((item) => {
    //                             Object.assign(item, {
    //                                 unit_price: Number(response.data.find(product => product.id === item.product_id).price)
    //                             });
    //                             return item;
    //                         })
    //                     }
    //                 }),
    //                 loaded: true
    //             }));
    //         })
    //         .catch(error => {
    //             console.log(error);
    //             this.setState({
    //                 loaded: true
    //             })
    //         });
    // }

    render() {
        if (this.props.user) {
            if (this.props.user.orders.length > 0) {
                const ordersRendered = this.props.user.orders.map((order) => {
                    return (
                        <Order
                            user={this.props.user}
                            orderData={order}
                            key={order.id}
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
                        </table><br/>
                        <button onClick={this.createBlankOrder}>Create new order</button><br/><br/>
                        <Link to="/">To the main page</Link>
                    </div>
                )
            } else {
                return null;
            }
        } else {
            window.location.href = '/';
        }
        return null
    }
}

export default OrdersBlock