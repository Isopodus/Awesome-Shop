import React, {Component} from 'react'
import axios from 'axios'

class Products extends Component {
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
        console.log(this.state);
        const productsRendered = this.state.products.map(function (product) {
            return (
                <div className="product" key={product.id}>
                    {product.name}<br/>
                    {product.description}<br/>
                    <b>{product.price}$</b>
                </div>
            );
        });

        return (
            <div className="products">
                <br/>
                {productsRendered}
            </div>
        )
    }
}

export default Products