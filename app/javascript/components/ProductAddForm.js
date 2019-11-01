import React, {Component} from 'react'
import axios from 'axios'

class ProductAddForm extends Component {

    constructor(props) {
        super(props);
        this.state = {
            name: '',
            description: '',
            price: 0
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(event) {
        axios
            .post('/api/products', this.state)
            .then((response) => {
                console.log(response);
            })
            .catch((error) => {
                console.log(error);
            });
        event.preventDefault();
    }

    handleChange(event) {
        this.setState({ [event.target.name]: event.target.value });
    }

    render() {
        return (
            <div className="product_add">
                {this.props.data.userSignedIn && this.props.data.user.role === 1 ? (
                    <div>
                        <h1>Hello, admin!</h1>
                        <form onSubmit={this.handleSubmit}>
                            Name:<br/>
                            <input type="text" name="name" onChange={this.handleChange}/><br/>
                            Description:<br/>
                            <textarea name="description" onChange={this.handleChange}/><br/>
                            Price:<br/>
                            <input type="number" step="0.01" min="0" name="price" onChange={this.handleChange}/><br/>
                            <input type="submit" value="Add new product"/>
                        </form>
                    </div>
                ) : (
                    <h1>403 - Forbidden</h1>
                )}
            </div>
        )
    }
}

export default ProductAddForm