import React from 'react'
import {BrowserRouter, Route, Switch} from 'react-router-dom'
import Home from './Home'

function App(props) {
    return (
        <div>
            <BrowserRouter>
                <Switch>
                    <Route exact path="/" component={() => <Home data={props}/>}/>
                </Switch>
            </BrowserRouter>
        </div>
    )
}

export default App