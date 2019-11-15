import React, {Component} from 'react'

class AccountEditForm extends Component {
    render() {
        return (
            <div className="account_edit">
                <div className="field">
                    <label htmlFor="user_email">Email</label><br/>
                    <input autoFocus="autofocus" autoComplete="email" type="email" value="itsjonny5757@gmail.com"
                           name="user[email]"
                           id="user_email"/>
                </div>

                <div className="field">
                    <label htmlFor="user_password">Password</label> <i>(leave blank if you don't want to change
                    it)</i><br/>
                    <input autoComplete="new-password" type="password" name="user[password]" id="user_password"/>
                    <br/>
                    <em>6 characters minimum</em>
                </div>

                <div className="field">
                    <label htmlFor="user_password_confirmation">Password confirmation</label><br/>
                    <input autoComplete="new-password" type="password" name="user[password_confirmation]"
                           id="user_password_confirmation"/>
                </div>

                <div className="field">
                    <label htmlFor="user_current_password">Current password</label> <i>(we need your current password to
                    confirm
                    your changes)</i><br/>
                    <input autoComplete="current-password" type="password" name="user[current_password]"
                           id="user_current_password"/>
                </div>

                <div className="actions">
                    <input type="submit" name="commit" value="Update" data-disable-with="Update"/>
                </div>
            </div>
        )
    }
}

export default AccountEditForm