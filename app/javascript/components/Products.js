import React from 'react'
import {useState, useEffect} from "react";
import axios from 'axios'

function Products(props) {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        axios
            .get('/api/products')
            .then(response => {
                setProducts(response.data.products);
            });
    }, []);

    const productsRendered = products.map(function(product){
        return (
            <div className="product_block">
                {product.name}<br/>
                {product.description}<br/>
                <b>{product.price}$</b>
            </div>
        );
    })

    return (
        <div className="products_block">
            <br/>
            {productsRendered}
        </div>
    )
}

export default Products