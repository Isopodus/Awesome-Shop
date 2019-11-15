import React, {Component} from 'react'
import axios from 'axios'
import Product from "./Product/Product";

class ProductsContainer extends Component {
    constructor(props) {
        super(props);
        this.state = {products: []};
        this.reloadProducts = this.reloadProducts.bind(this);
        this._isMounted = false;
    }

    reloadProducts() {
        axios
            .get('/api/products')
            .then(response => {
                if (this._isMounted) {
                    this.setState({products: response.data});
                }
            });
    }

    componentDidMount() {
        this.reloadProducts();
        this._isMounted = true;
    }

    componentWillUnmount() {
        this._isMounted = false;
    }

    render() {
        const productsRendered = this.state.products.map((product) => {
            // Check if this product is already in cart and give it green color if so
            let isInCart = false;
            if (this.props.order.products.findIndex(item => item.product.id === product.id) >= 0) {
                isInCart = true;
            }
            return <Product
                product={product}
                isInCart={isInCart}
                key={product.id}
                user={this.props.user}
                order={this.props.order}
                orderHandler={this.props.orderHandler}
                reloadProducts={this.reloadProducts}/>;
        }, this);

        return (
            <div className="products_container">
                <br/>
                {productsRendered}
            </div>
        )
    }
}

export default ProductsContainer