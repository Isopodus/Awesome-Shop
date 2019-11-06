import React, {Component} from 'react'
import axios from 'axios'
import Product from "./Product";

class ProductsBlock extends Component {
    constructor(props) {
        super(props);
        this.state = {products: []};
    }

    componentDidMount() {
        axios
            .get('/api/products')
            .then(response => {
                this.setState({products: response.data});
            });
    }

    render() {
        const productsRendered = this.state.products.map(function (product) {
            return <Product
                product={product}
                key={product.id}
                user={this.props.user}/>;
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