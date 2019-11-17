import React, {Component} from 'react'
import axios from "axios";
import {Redirect} from "react-router-dom";

class Order extends Component {
    constructor(props) {
        super(props);
        this.state = {
            notice: null,
            redirect: null
        };

        this.setActive = this.setActive.bind(this);
        this.confirmOrder = this.confirmOrder.bind(this);
        this.deleteOrder = this.deleteOrder.bind(this);
        this.showOrder = this.showOrder.bind(this);
    }

    setActive() {
        axios
            .get('/users/set_active_order/' + this.props.orderData.order_id)
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

    confirmOrder() {
        if (this.props.orderData.products.length > 0) {
            axios
                .get('/api/orders/confirm_order/' + this.props.orderData.order_id)
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
        } else {
            this.props.setNotice(<p>You can not confirm an empty order!</p>)
        }
    }

    deleteOrder() {
        if (window.confirm("Are you sure?")) {
            axios
                .delete('/api/orders/' + this.props.orderData.order_id)
                .then(response => {
                    if (response.status === 204) {
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
    }

    showOrder() {
        this.setState({
            redirect: <Redirect to={'/account/orders/' + this.props.orderData.order_id}/>
        });
    }

    render() {
        const datetimeFormatter = new Intl.DateTimeFormat('en-GB', {
            year: 'numeric',
            month: 'long',
            day: '2-digit',
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
        });
        let status;
        if (this.props.orderData.status === 0) {
            status = 'Incomplete';
        } else if (this.props.orderData.status === 1) {
            status = 'Processing';
        } else if (this.props.orderData.status === 2) {
            status = 'Complete';
        }

        let total = 0;
        this.props.orderData.products.forEach((item) => {
            total += item.product.price * item.quantity;
        });

        let buttons = null;
        if (this.props.orderData.status === 0 && this.props.user.checked_order_id !== this.props.orderData.order_id) {
            buttons = <>
                <a className="link" onClick={this.setActive}>Set active</a>
                <br/><br/><br/>
                <a className="link" onClick={this.confirmOrder}>Confirm</a>
                <a className="link" onClick={this.deleteOrder}>Delete</a>
            </>
        } else if (this.props.orderData.status === 0) {
            buttons = <>
                <a className="link" onClick={this.confirmOrder}>Confirm</a>
                <br/><br/><br/>
                <a className="link" onClick={this.deleteOrder}>Delete</a>
            </>
        }

        let rowClassName = 'order_row';
        let statusClassName = 'status_incomplete';
        if (this.props.user.checked_order_id === this.props.orderData.order_id && this.props.orderData.status === 0) {
            rowClassName = 'order_row order_chosen';
        }

        if (this.props.orderData.status === 1) {
            statusClassName = 'status_processing';
        } else if (this.props.orderData.status === 2) {
            statusClassName = 'status_complete';
        }

        return (
            <>
                {this.state.redirect}
                <tr className={rowClassName} onClick={this.showOrder}>
                    <td>{this.props.orderData.order_id}</td>
                    <td>{datetimeFormatter.format(Date.parse(this.props.orderData.created_at))}</td>
                    <td>
                        <div className={statusClassName}>{status}</div>
                    </td>
                    <td>{this.props.orderData.products.length}</td>
                    <td><b>{total}$</b></td>
                    <td>{buttons}</td>
                </tr>
            </>
        )
    }
}

export default Order