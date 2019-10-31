import React from 'react'

function Home(props) {
    let loginButton;
    console.log(props);
    if (props.data.userSignedIn) {
        loginButton = <a href="/users/sign_out" data-method="delete" rel="nofollow">Log out</a>
    }
    else {
        loginButton = <a href="/users/sign_in">Sign in</a>
    }

    return (
        <div>
            {props.data.notice && <div>{props.data.notice}</div>}
            {props.data.m_alert && <div>{props.data.m_alert}</div>}
            Welcome, {props.data.userSignedIn ? props.data.user.username : "Guest"}!<br/>
            {loginButton}<br/>
            <a href="/users/sign_up">Sign up</a>
        </div>
    )
}

export default Home