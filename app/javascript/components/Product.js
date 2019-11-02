import React, {Component} from 'react'
import axios from 'axios'
import defaultImage from 'images/default_image.png'

class Product extends Component {
    constructor(props) {
        super(props);
        this.deleteProduct = this.deleteProduct.bind(this);
    }

    deleteProduct(productId) {
        if (window.confirm('Are you sure?')) {
            axios
                .delete(`/api/products/${productId}`)
                .then((response) => {
                    if (response.status === 204) {
                        window.location.reload();
                    }
                })
                .catch((error) => {
                    console.log(error);
                });
        }
    }

    render() {
        return (
            <div className="product">
                {this.props.product.name}<br/>
                {this.props.product.description}<br/>
                <b>{this.props.product.price}$</b><br/>
                {this.props.product.image_url != null ? (
                    <img src={this.props.product.image_url} alt="Image" className="product_image"/>
                ) : (
                    <img src={defaultImage} alt="Image" className="product_image"/>
                )}
                <br/>
                {this.props.data.user && this.props.data.user.role === 1 && (
                    <button onClick={() => this.deleteProduct(this.props.product.id)}>Delete product</button>
                )}
            </div>
        )
    }
}

export default Product