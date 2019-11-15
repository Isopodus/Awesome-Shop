import React, {Component} from 'react'
import Header from "../Header/Header";
import {Link} from "react-router-dom";

class Account extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        if (this.props.user) {
            return (
                <div className="account">
                    <Header
                        user={this.props.user}
                        order={this.props.order}/>
                    <div className="wrapper">
                        <h3>Account</h3>
                        <p>Username: {this.props.user.username}</p>
                        <p>Email: {this.props.user.email}</p>
                        <br/>
                        <a href="/users/edit" className="link">Edit account data</a>
                        <br/><br/><br/>
                        {this.props.user.role === 1 &&
                        <>
                            <a href="/account/manager" className="link">Manage users</a>
                            <br/><br/><br/>
                        </>}
                        <Link className="link" to="/">To the main page</Link>
                    </div>
                </div>
            )
        } else {
            window.location.href = '/';
        }
        return null
    }
}

export default Account