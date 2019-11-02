import React, {Component} from 'react'
import axios from 'axios'
import $ from 'jquery'

class ProductAddForm extends Component {

    constructor(props) {
        super(props);
        this.state = {
            name: '',
            description: '',
            price: 0,
            image: null,
            image_url: null
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleFile = this.handleFile.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(event) {
        //event.preventDefault();
        const formData = new FormData();
        formData.append('product[name]', this.state.name);
        formData.append('product[description]', this.state.description);
        formData.append('product[price]', this.state.price);
        if (this.state.image) {
            formData.append('product[image]', this.state.image);
        }

        $.ajax({
            url: '/api/products',
            method: 'POST',
            data: formData,
            contentType: false,
            processData: false

        }).then((response) => {
            //console.log(response);
        }).catch((error) => {
            console.log(error);
        });
    }

    handleChange(event) {
        this.setState({[event.target.name]: event.target.value});
    }

    handleFile(event) {
        event.persist();
        const file = event.target.files[0];
        const fileReader = new FileReader();
        fileReader.onloadend = () => {
            this.setState({image: event.target.files[0], image_url: fileReader.result});
        };
        if (file) {
            fileReader.readAsDataURL(file);
        }
    }

    render() {
        console.log(this.state);
        const prewiew = this.state.image_url ? <img className="" src={this.state.image_url} alt="Prewiew"/> : null;
        return (
            <div className="product_add">
                {this.props.data.user && this.props.data.user.role === 1 ? (
                    <div>
                        <h1>Hello, admin!</h1>
                        <form onSubmit={this.handleSubmit}>
                            Name:<br/>
                            <input type="text" name="name" onChange={this.handleChange} required/><br/>
                            Description:<br/>
                            <textarea name="description" onChange={this.handleChange}/><br/>
                            Price:<br/>
                            <input type="number" step="0.01" min="0" name="price" onChange={this.handleChange}
                                   required/><br/>
                            Image:<br/>
                            <input type="file" name="image" accept=".jpg, .jpeg, .png, .gif"
                                   onChange={this.handleFile}/><br/>
                            {prewiew}
                            <br/><br/>
                            <input type="submit" value="Add new product"/>
                        </form>
                        <br/>
                        <a href="/">To the main page</a>
                    </div>
                ) : (
                    <h1>403 - Forbidden</h1>
                )}
            </div>
        )
    }
}

export default ProductAddForm