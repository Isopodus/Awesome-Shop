import React from 'react'

function OrderItem(props) {
    return (
        <tr title={props.itemData.product.description} className="order_item_row">
            <td>{props.itemData.product.id}</td>
            <td>{props.itemData.product.name}</td>
            <td>{props.itemData.quantity}</td>
            <td>{props.itemData.product.price}$</td>
            <td>{Math.round(props.itemData.product.price * props.itemData.quantity * 100) / 100}$</td>
        </tr>
    )
}

export default OrderItem