import React, {Component} from 'react'
import axios from "axios";

class Order extends Component {
    constructor(props) {
        super(props);
        this.state = {
            notice: null
        };

        this.setActive = this.setActive.bind(this);
        this.confirmOrder = this.confirmOrder.bind(this);
        this.deleteOrder = this.deleteOrder.bind(this);
    }

    setActive() {
        axios
            .get('/users/set_active_order/' + this.props.orderData.id)
            .then(response => {
                if (response.status === 200) {
                    window.location.reload();
                    //console.log(response.data);
                }
            })
            .catch(error => {
                console.log(error);
            });
    }

    confirmOrder() {
        axios
            .get('/api/orders/confirm_order/' + this.props.orderData.id)
            .then(response => {
                if (response.status === 200) {
                    window.location.reload();
                    //console.log(response.data);
                }
            })
            .catch(error => {
                console.log(error);
            });
    }

    deleteOrder() {
        if (window.confirm("Are you sure?")) {
            if (this.props.user.checked_order_id !== this.props.orderData.id) {
                axios
                    .delete('/api/orders/' + this.props.orderData.id)
                    .then(response => {
                        if (response.status === 204) {
                            window.location.reload();
                            //console.log(response.data);
                        }
                    })
                    .catch(error => {
                        console.log(error);
                    });
            } else {
                this.props.setNotice(<p>Please set another order active before deleting this</p>);
            }
        }
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
            status = 'Delivery pending';
        } else if (this.props.orderData.status === 3) {
            status = 'Complete';
        }

        let total = 0;
        this.props.orderData.order_items.forEach((item) => {
            total += item.product.price * item.quantity;
        });

        let buttons = null;
        if (this.props.orderData.status === 0 && this.props.user.checked_order_id !== this.props.orderData.id) {
            buttons = <>
                <button onClick={this.setActive}>Set active</button>
                <br/>
                <button onClick={this.confirmOrder}>Confirm</button>
                <br/>
                <button onClick={this.deleteOrder}>Delete</button>
            </>
        } else if (this.props.orderData.status === 0) {
            buttons = <>
                <button onClick={this.confirmOrder}>Confirm</button>
                <br/>
                <button onClick={this.deleteOrder}>Delete</button>
            </>
        }

        let className;
        if (this.props.user.checked_order_id === this.props.orderData.id && this.props.orderData.status === 0) {
            className = 'blue_order';
        } else if (this.props.orderData.status === 1 || this.props.orderData.status === 2) {
            className = 'yellow_order';
        } else if (this.props.orderData.status === 3) {
            className = 'green_order';
        } else {
            className = 'order_row';
        }

        return (
            <tr className={className}>
                <td>{this.props.orderData.id}</td>
                <td>{datetimeFormatter.format(Date.parse(this.props.orderData.created_at))}</td>
                <td>{status}</td>
                <td>{this.props.orderData.order_items.length}</td>
                <td><b>{total}$</b></td>
                <td>{buttons}</td>
            </tr>
        )
    }
}

export default Order