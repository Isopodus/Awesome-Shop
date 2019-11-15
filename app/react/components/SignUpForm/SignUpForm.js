import React from 'react'

function SignUpForm(props) {
    return (
        <div className="sign_up">
            <div className="wrapper">
                <h2>Sign up</h2>
                {props.notice && <div>{props.notice}</div>}
                {props.m_alert && <div>{props.m_alert}</div>}
                Username<br/>
                <input autoFocus="autofocus" autoComplete="username" type="text" name="user[username]"/><br/><br/>

                Email<br/>
                <input autoComplete="email" type="email" name="user[email]"/><br/><br/>

                Password<br/>
                <input autoComplete="new-password" type="password" name="user[password]" minLength="6"/><br/><br/>

                Password confirmation<br/>
                <input autoComplete="new-password" type="password" name="user[password_confirmation]"/><br/><br/>

                <input className="link" type="submit" name="commit" value="Sign up"/><br/>
                <a href="/users/sign_in" className="mini_link">Sign in</a><br/>
                <a href="/" className="mini_link">To the main page</a>
            </div>
        </div>
    )
}

export default SignUpForm