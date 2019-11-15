import React, {Component} from 'react'

class CartItem extends Component {
    constructor(props) {
        super(props);
        this.deleteItem = this.deleteItem.bind(this);
        this.handleQuantity = this.handleQuantity.bind(this);
    }

    deleteItem() {
        let order = this.props.order;
        order.products = order.products.filter(item => item.product.id !== this.props.itemData.product.id);
        this.props.orderHandler(order);
    }

    handleQuantity(e) {

        e.preventDefault();
        let order = this.props.order;
        let itemIndex = order.products.findIndex(item => item.product.id === this.props.itemData.product.id);
        let value = Number(e.target.value);
        if (value < 1) {
            value = 1;
        }

        if (itemIndex >= 0) {
            order.products[itemIndex].quantity = value;
        }
        this.props.orderHandler(order);
    }

    render() {
        return (
            <tr title={this.props.itemData.product.description} className="order_item_row">
                <td>{this.props.itemData.product.id}</td>
                <td className="name_field">{this.props.itemData.product.name}</td>
                <td>
                    <input className="quantity_field" type="number" name="quantity" min="1" value={this.props.itemData.quantity} onChange={this.handleQuantity}/>
                </td>
                <td>{this.props.itemData.product.price}$</td>
                <td>{Math.round(this.props.itemData.product.price * this.props.itemData.quantity * 100) / 100}$</td>
                <td>
                    <a className="link" onClick={this.deleteItem}>Delete</a>
                </td>
            </tr>
        )
    }
}

export default CartItem