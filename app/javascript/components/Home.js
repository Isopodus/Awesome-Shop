import React from 'react'
import ProductsBlock from "./ProductsBlock";

function Home(props) {

    return (
        <div>
            <div className="menu_block">
                Welcome, {props.data.user ? props.data.user.username : "Guest"}!
            </div>
            <div className="menu_block">
                {props.data.user ? (
                    <a href="/users/sign_out" data-method="delete">Log out</a>
                ) : (
                    <a href="/users/sign_in">Sign in</a>
                )}
            </div>
            <div className="menu_block">
                <a href="/users/sign_up">Sign up</a>
            </div>
            {props.data.user && props.data.user.role === 1 && (
                <div className="menu_block">
                    <a href="/new_product">Add new product</a>
                </div>
            )}

            {props.data.notice && <div>{props.data.notice}</div>}
            {props.data.m_alert && <div>{props.data.m_alert}</div>}

            <ProductsBlock data={props.data}/>
        </div>
    )
}

export default Home