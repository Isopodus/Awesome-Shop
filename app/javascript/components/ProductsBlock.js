import React, {Component} from 'react'
import axios from 'axios'
import Product from "./Product";

class ProductsBlock extends Component {
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
                if(this._isMounted) {
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
            return <Product
                product={product}
                key={product.id}
                user={this.props.user}
                order={this.props.order}
                orderHandler={this.props.orderHandler}
                reloadProducts={this.reloadProducts}/>;
        }, this);

        return (
            <div className="products_block">
                <br/>
                {productsRendered}
            </div>
        )
    }
}

export default ProductsBlock