import React, {Component} from 'react'
import ProductsBlock from "./ProductsBlock";
import {Link} from "react-router-dom";

class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            cart: {
                itemsCount: 0,
                total: 0
            }
        };
    }


    componentDidMount() {
        let order = this.props.order;
        if (order) {
            let total = 0;
            order.order_items.forEach(item => total += item.quantity * item.product.price);
            this.setState({
                cart: {
                    total: Math.round(total * 100)/100,
                    itemsCount: order.order_items.length
                }
            });
        }
    }

    render() {
        return (
            <div>
                <div className="menu_block">
                    Welcome, {this.props.user ? this.props.user.username : "Guest"}!
                </div>
                {this.props.user ? (
                    <div className="inline">
                        <div className="menu_block">
                            {this.props.order.status === 0 ? (
                                <div>You have {this.state.cart.itemsCount} items in your cart ({this.state.cart.total}$ total)</div>
                            ) : (
                                <div>You have no active orders chosen</div>
                            )}
                        </div>
                        <div className="menu_block">
                            <Link to="/account/cart">Cart</Link>
                        </div>
                        <div className="menu_block">
                            <Link to="/account/orders">My orders</Link>
                        </div>
                        <div className="menu_block">
                            <Link to="/users/sign_out" data-method="delete">Log out</Link>
                        </div>
                    </div>
                ) : (
                    <div className="inline">
                        <div className="menu_block">
                            <a href="/users/sign_in">Sign in</a>
                        </div>
                        <div className="menu_block">
                            <a href="/users/sign_up">Sign up</a>
                        </div>
                    </div>
                )}
                {this.props.user && this.props.user.role === 1 && (
                    <div className="menu_block">
                        <Link to="/new_product">Add new product</Link>
                    </div>
                )}

                {this.props.m_notice && <div>{this.props.m_notice}</div>}
                {this.props.m_alert && <div>{this.props.m_alert}</div>}

                <ProductsBlock
                    user={this.props.user}
                    order={this.props.order}
                    orderHandler={this.props.orderHandler}
                    m_notice={this.props.m_notice}
                    m_alert={this.props.m_alert}/>
            </div>
        )
    }
}

export default Home