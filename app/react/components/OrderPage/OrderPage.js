import React, {Component} from 'react'
import {Link} from "react-router-dom";
import axios from "axios";
import Header from "../Header/Header";

class OrderPage extends Component {

    constructor(props) {
        super(props);
        this.state = {
            order: null,
            loaded: false
        };
        this.editOrder = this.editOrder.bind(this);
    }

    componentDidMount() {
        axios
            .get('/api/orders/' + this.props.match.params.id)
            .then(response => {
                if (response.status === 200 && response.data) {
                    this.setState({order: response.data, loaded: true});
                } else {
                    alert("Unexpected error occurred");
                    window.location.href = '/';
                }
            });
    }

    editOrder() {
        axios
            .get('/users/set_active_order/' + this.props.match.params.id)
            .then(response => {
                if (response.status === 200) {
                    window.location.href = '/account/cart'
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
        if (!this.props.user) {
            window.location.href = '/';
        }
        if (this.state.loaded) {
            let itemsRendered = this.state.order.products.map(item => {
                return (
                    <tr title={item.product.description} className="order_item_row" key={item.product.id}>
                        <td>{item.product.id}</td>
                        <td>{item.product.name}</td>
                        <td>{item.quantity}</td>
                        <td>{item.product.price}$</td>
                        <td>{Math.round(item.product.price * item.quantity * 100) / 100}$</td>
                    </tr>
                )
            });
            return (
                <div className="order_page">
                    <Header
                        user={this.props.user}
                        order={this.props.order}/>
                    <div className="wrapper">
                        <h3 className="orders_header">Order ID: {this.props.match.params.id}</h3>
                        <table className="order_page_table">
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
                        {this.state.order.status === 0 &&
                        <>
                            <br/><br/>
                            <a className="link" onClick={this.editOrder}>Edit order</a>
                        </>
                        }
                    </div>
                    <br/><br/>
                    <Link className="link" to="/">To the main page</Link>
                </div>
            )
        }
        return null
    }
}

export default OrderPage