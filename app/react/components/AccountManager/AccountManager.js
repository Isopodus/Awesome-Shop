import React, {Component} from 'react'
import Header from "../Header/Header";
import {Link} from "react-router-dom";
import axios from 'axios';
import AccountRow from "./AccountRow/AccountRow";

class AccountManager extends Component {

    constructor(props) {
        super(props);
        this.state = {
            users: []
        }
    }

    componentDidMount() {
        axios
            .get('/users')
            .then(response => {
                if (response.status === 200) {
                    this.setState({
                        users: response.data
                    })
                }
            })
    }

    render() {
        if (this.props.user && this.props.user.role === 1) {
            const accountsRendered = this.state.users.map(account => {
                return (
                    <AccountRow account={account} key={account.id}/>
                )
            });
            return (
                <div className="account_manager">
                    <Header
                        user={this.props.user}
                        order={this.props.order}/>
                    <div className="wrapper">
                        <h3>User accounts</h3>
                        <table className="accounts_table">
                            <thead>
                            <tr>
                                <th>ID</th>
                                <th>Email</th>
                                <th>Username</th>
                                <th>Admin</th>
                            </tr>
                            </thead>
                            <tbody>
                            {accountsRendered}
                            </tbody>
                        </table>
                        <br/><br/><br/>
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

export default AccountManager