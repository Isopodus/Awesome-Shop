import React from 'react'
import {BrowserRouter, Route, Switch} from 'react-router-dom'
import Home from './Home'
import ProductAddForm from "./ProductAddForm";

function App(props) {
    return (
        <div>
            <BrowserRouter>
                <Switch>
                    <Route exact path="/" component={() => <Home data={props}/>}/>
                    <Route exact path="/new_product" component={() => <ProductAddForm data={props}/>}/>
                </Switch>
            </BrowserRouter>
        </div>
    )
}

export default App