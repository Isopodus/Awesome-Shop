import React, {Component} from 'react'
import {BrowserRouter, Route, Switch} from 'react-router-dom'
import Cookies from 'universal-cookie';
//import RingLoader from 'react-spinners/ClipLoader';
import Home from './Home'
import ProductAdd from "./ProductAdd";
import ProductEdit from "./ProductEdit";
import axios from "axios";

class App extends Component {
    constructor(props) {
        super(props);

        const cookies = new Cookies();
        this.state = {
            userId: cookies.get("user_id"),
            user: null,
            loaded: false
        };
    }

    componentDidMount() {
        if (this.state.userId) {
            axios
                .get('/users/' + this.state.userId)
                .then(response => {
                    this.setState({
                        user: response.data,
                        loaded: true
                    });
                });
        } else {
            this.setState({
                loaded: true
            });
        }
    }

    render() {
        return (
            <div>
                {this.state.loaded ? (
                    <BrowserRouter>
                        <Switch>
                            <Route exact path="/" component={() => <Home
                                user={this.state.user}
                                m_notice={this.props.m_notice}
                                m_alert={this.props.m_alert}/>}/>
                            <Route exact path="/new_product" component={() => <ProductAdd
                                user={this.state.user}/>}/>
                            <Route exact path="/edit_product/:id" component={(props) => <ProductEdit
                                user={this.state.user}
                                {...props}/>}/>
                        </Switch>
                    </BrowserRouter>
                ) : (
                    <div></div>
                )}
            </div>
        )
    }
}

export default App