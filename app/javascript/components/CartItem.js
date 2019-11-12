import React, {Component} from 'react'

class CartItem extends Component {
    constructor(props) {
        super(props);
        this.deleteItem = this.deleteItem.bind(this);
    }

    deleteItem() {
        let order = this.props.order;
        order.products = order.products.filter(item => item.product.id !== this.props.itemData.product.id);
        this.props.orderHandler(order);
    }

    render() {
        return (
            <tr title={this.props.itemData.product.description} className="order_item_row">
                <td>{this.props.itemData.product.id}</td>
                <td>{this.props.itemData.product.name}</td>
                <td>{this.props.itemData.quantity}</td>
                <td>{this.props.itemData.product.price}$</td>
                <td>{Math.round(this.props.itemData.product.price * this.props.itemData.quantity * 100) / 100}$</td>
                <td>
                    <button onClick={this.deleteItem}>Delete</button>
                </td>
            </tr>
        )
    }
}

export default CartItem