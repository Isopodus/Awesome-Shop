import React, {Component} from 'react'
import {BrowserRouter, Redirect, Route, Switch} from 'react-router-dom'
import axios from "axios";
import Cookies from 'universal-cookie';
import Home from './Home'
import ProductAdd from "./ProductAdd";
import ProductEdit from "./ProductEdit";
import OrdersBlock from "./OrdersBlock";
import Cart from "./Cart";

class App extends Component {
    constructor(props) {
        super(props);

        this.state = {
            user: null,
            order: {
                id: null,
                user_id: null,
                status: null,
                order_items: []
            },
            loaded: false
        };

        if (!localStorage.getItem('order')) {
            localStorage.setItem('order', JSON.stringify(this.state.order));
        } else {
            this.state = {
                user: null,
                order: JSON.parse(localStorage.getItem('order')),
                loaded: false
            };
        }

        this.orderHandler = this.orderHandler.bind(this);
        this.reloadUser = this.reloadUser.bind(this);
    }

    orderHandler(order) {
        this.setState({
            order: order
        });
        localStorage.setItem('order', JSON.stringify(order));
    }

    reloadUser() {
        const cookies = new Cookies();
        if (cookies.get("user_id")) {
            axios
                .get('/users/' + cookies.get("user_id"))
                .then(response => {
                    if (response.status === 200) {
                        this.setState({
                            user: response.data,
                            loaded: true
                        });
                        this.orderHandler(response.data.orders.find(order => order.id === response.data.checked_order_id));
                    }
                })
                .catch(error => {
                    console.log(error);
                });
        } else {
            this.setState({
                loaded: true
            });
            localStorage.clear();
        }
    }

    componentDidMount() {
        this.reloadUser();
    }

    render() {
        return (
            <div>
                {this.state.loaded ? (
                    <BrowserRouter>
                        <Switch>
                            <Route exact path="/" component={() => <Home
                                user={this.state.user}
                                order={this.state.order}
                                orderHandler={this.orderHandler}
                                m_notice={this.props.m_notice}
                                m_alert={this.props.m_alert}/>}/>
                            <Route exact path="/new_product" component={() => <ProductAdd
                                user={this.state.user}/>}/>
                            <Route exact path="/edit_product/:id" component={(props) => <ProductEdit
                                user={this.state.user}
                                {...props}/>}/>
                            <Route exact path="/account/orders" component={() => <OrdersBlock
                                user={this.state.user}
                                order={this.state.order}
                                orderHandler={this.orderHandler}
                            />}/>
                            <Route exact path="/account/cart" component={() => <Cart
                                user={this.state.user}
                                order={this.state.order}
                                orderHandler={this.orderHandler}
                            />}/>
                            <Redirect to='/'/>
                        </Switch>
                    </BrowserRouter>
                ) : null}
            </div>
        )
    }
}

export default App