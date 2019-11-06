import React from 'react'
import ProductsBlock from "./ProductsBlock";
import ProductAdd from "./ProductAdd";

function Home(props) {

    return (
        <div>
            <div className="menu_block">
                Welcome, {props.user ? props.user.username : "Guest"}!
            </div>
            <div className="menu_block">
                {props.user ? (
                    <a href="/users/sign_out" data-method="delete">Log out</a>
                ) : (
                    <a href="/users/sign_in">Sign in</a>
                )}
            </div>
            <div className="menu_block">
                <a href="/users/sign_up">Sign up</a>
            </div>
            {props.user && props.user.role === 1 && (
                <div className="menu_block">
                    <a href="/new_product">Add new product</a>
                </div>
            )}

            {props.notice && <div>{props.notice}</div>}
            {props.m_alert && <div>{props.m_alert}</div>}

            <ProductsBlock
                user={props.user}
                m_notice={props.m_notice}
                m_alert={props.m_alert}/>
        </div>
    )
}

export default Home