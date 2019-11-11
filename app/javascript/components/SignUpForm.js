import React from 'react'

function SignUpForm(props) {
    return (
        <div className="register">
            {props.notice && <div>{props.notice}</div>}
            {props.m_alert && <div>{props.m_alert}</div>}
            <div className="field">
                <label htmlFor="user_username">Username</label><br/>
                <input autoFocus="autofocus" autoComplete="username" type="text" name="user[username]" id="user_username"/>
            </div>

            <div className="field">
                <label htmlFor="user_email">Email</label><br/>
                <input autoComplete="email" type="email" name="user[email]" id="user_email"/>
            </div>

            <div className="field">
                <label htmlFor="user_password">Password</label>
                <em>(6 characters minimum)</em><br/>
                <input autoComplete="new-password" type="password" name="user[password]" id="user_password"/>
            </div>

            <div className="field">
                <label htmlFor="user_password_confirmation">Password confirmation</label><br/>
                <input autoComplete="new-password" type="password" name="user[password_confirmation]"
                       id="user_password_confirmation"/>
            </div>

            <div className="actions">
                <input type="submit" name="commit" value="Sign up" data-disable-with="Sign up"/>
            </div>
            <a to="/">Back to the main page</a>
        </div>
    )
}

export default SignUpForm