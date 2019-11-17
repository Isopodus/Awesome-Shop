import React, {Component} from 'react'
import {Link} from "react-router-dom";

class Header extends Component {
    render() {
        let total = 0;
        let itemsCount = 0;
        if (this.props.order) {
            this.props.order.products.forEach(item => total += item.quantity * item.product.price);
            itemsCount = this.props.order.products.length;
        }
        total = Math.round(total * 100) / 100;

        return (
            <div className="header">
                <Link className="menu_header" to="/">
                    Awesome shop
                </Link>
                {this.props.user ? (
                    <>
                        <div className="menu_links_block">
                            {this.props.user && this.props.user.role === 1 && (
                                <Link to="/new_product" className="link">Add new product</Link>
                            )}
                            <Link to="/account/cart" className="link">Cart</Link>
                            <Link to="/account/orders" className="link">My orders</Link>
                            <Link to="/account" className="link">My account</Link>
                            <Link to="/users/sign_out" data-method="delete" className="link">Log out</Link>
                        </div>
                        {this.props.order.status === 0 &&
                        <div className="cart_block">
                            <div>You have {itemsCount} items in your cart ({total}$
                                total)
                            </div>
                        </div>
                        }
                    </>
                ) : (
                    <div className="menu_links_block">
                        <a href="/users/sign_in" className="link">Sign in</a>
                        <a href="/users/sign_up" className="link">Sign up</a>
                    </div>
                )}
            </div>
        )
    }
}

export default Header