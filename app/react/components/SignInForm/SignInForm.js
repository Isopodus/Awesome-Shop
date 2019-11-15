import React from 'react'

function SignInForm(props) {
    return (
        <div className="sign_in">
            <div className="wrapper">
                <h2>Log in</h2>
                {props.notice && <div>{props.notice}</div>}
                {props.m_alert && <div>{props.m_alert}</div>}
                <div className="form_fields">
                    Email<br/>
                    <input autoFocus="autofocus" autoComplete="email" type="email" name="user[email]"/><br/><br/>
                    Password<br/>
                    <input autoComplete="current-password" type="password" name="user[password]"/><br/><br/>

                    <input name="user[remember_me]" type="hidden" value="0"/>
                    <input type="checkbox" value="1" name="user[remember_me]" id="remember_me"/>
                    <label htmlFor="remember_me">Remember me</label>
                </div>

                <input className="link" type="submit" name="commit" value="Log in"/>
                <br/><br/>
                <a href="/users/sign_up" className="mini_link">Sign up</a><br/>
                <a href="/users/password/new" className="mini_link">Forgot password?</a><br/>
                <a href="/users/confirmation/new" className="mini_link">Resend confirmation instructions</a><br/>
                <a href="/" className="mini_link">To the main page</a>
            </div>
        </div>
    )
}

export default SignInForm