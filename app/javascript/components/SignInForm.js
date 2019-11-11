import React from 'react'

function SignInForm(props) {
    return (
        <div className="login">
            {props.notice && <div>{props.notice}</div>}
            {props.m_alert && <div>{props.m_alert}</div>}
            <div className="field">
                <label htmlFor="user_email">Email</label><br/>
                <input autoFocus="autofocus" autoComplete="email" type="email" name="user[email]"
                       id="user_email"/>
            </div>

            <div className="field">
                <label htmlFor="user_password">Password</label><br/>
                <input autoComplete="current-password" type="password" name="user[password]" id="user_password"/>
            </div>

            <div className="field">
                <input name="user[remember_me]" type="hidden" value="0"/>
                <input type="checkbox" value="1" name="user[remember_me]" id="user_remember_me"/>
                <label htmlFor="user_remember_me">Remember me</label>
            </div>

            <div className="actions">
                <input type="submit" name="commit" value="Log in" data-disable-with="Log in"/>
            </div>
            <br/>
            <a to="/">Back to the main page</a>
        </div>
    )
}

export default SignInForm