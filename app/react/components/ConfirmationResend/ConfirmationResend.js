import React from 'react'

function ConfirmationResend(props) {
    return (
        <div className="confirmation_resend">
            <div className="wrapper">
                <h2>Resend confirmation instructions</h2>

                Please, enter your email to receive confirmation instructions<br/>
                <input autoFocus="autofocus" autoComplete="email" type="email" name="user[email]"/><br/>

                <input className="link" type="submit" name="commit" value="Send"/>
                <br/><br/>
                <a href="/users/sign_in" className="mini_link">Sign in</a><br/>
                <a href="/users/sign_up" className="mini_link">Sign up</a><br/>
                <a href="/" className="mini_link">To the main page</a>
            </div>
        </div>
    )
}

export default ConfirmationResend