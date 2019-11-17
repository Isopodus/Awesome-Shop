import React, {Component} from 'react'
import axios from "axios";

class AccountRow extends Component {
    constructor(props) {
        super(props);
        this.state = {
            admin: this.props.account.role === 1
        };

        this.toggleAdmin = this.toggleAdmin.bind(this);
    }

    toggleAdmin() {
        axios
            .get('/users/toggle_admin/' + this.props.account.id)
            .then(response => {
                if (response.status === 200) {
                    window.location.reload();
                    //console.log(response.data);
                } else {
                    alert("Unexpected error occurred");
                    window.location.href = '/';
                }
            })
            .catch(error => {
                console.log(error);
            });
    }

    render() {
        return (
            <tr className="account_item">
                <td>{this.props.account.id}</td>
                <td>{this.props.account.email}</td>
                <td>{this.props.account.username}</td>
                <td><input type="checkbox"
                           checked={this.state.admin}
                           onChange={this.toggleAdmin}/></td>
            </tr>
        )
    }
}

export default AccountRow