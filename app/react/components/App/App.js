import React, {Component} from 'react'
import {BrowserRouter, Redirect, Route, Switch} from 'react-router-dom'
import axios from "axios";
import Cookies from 'universal-cookie';
import Home from '../Home/Home'
import ProductAdd from "../Product/ProductAdd/ProductAdd";
import ProductEdit from "../Product/ProductEdit/ProductEdit";
import OrdersContainer from "../OrdersContainer/OrdersContainer";
import Cart from "../Cart/Cart";
import Account from "../Account/Account";
import AccountManager from "../AccountManager/AccountManager";

class App extends Component {
    constructor(props) {
        super(props);

        this.state = {
            user: null,
            order: {
                order_id: null,
                user_id: null,
                status: 0,
                products: []
            },
            loaded: false
        };
        this.orderHandler = this.orderHandler.bind(this);
    }

    orderHandler(order) {
        this.setState({
            order: order
        });
    }

    componentDidMount() {
        const cookies = new Cookies();
        if (cookies.get("user_id")) {
            axios
                .get('/users/' + cookies.get("user_id"))
                .then(response => {
                    if (response.status === 200) {
                        this.setState({
                            user: response.data,
                            order: {
                                order_id: null,
                                user_id: response.data.id,
                                status: 0,
                                products: []
                            },
                            loaded: true
                        });
                        let order = response.data.orders.find(order => order.order_id === response.data.checked_order_id);
                        if (order) {
                            this.orderHandler(order);
                        }
                    }
                })
                .catch(error => {
                    console.log(error);
                });
        } else {
            this.setState({
                loaded: true
            });
        }
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
                            <Route exact path="/account" component={() => <Account
                                order={this.state.order}
                                user={this.state.user}
                            />}/>
                            <Route exact path="/account/manager" component={() => <AccountManager
                                user={this.state.user}
                                order={this.state.order}
                            />}/>
                            <Route exact path="/account/orders" component={() => <OrdersContainer
                                user={this.state.user}
                                order={this.state.order}
                                orderHandler={this.orderHandler}
                            />}/>
                            <Route exact path="/account/cart" render={() => <Cart
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