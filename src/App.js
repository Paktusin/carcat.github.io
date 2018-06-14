import React, {Component} from 'react';
import './App.css';
import Brands from './components/Brand/Brands'
import {createStore} from 'redux'
import {Provider} from "react-redux";
import reducer from "./reducer";
import {HashRouter, Redirect, Route, Switch} from "react-router-dom";
import Models from "./components/Model/Models";

const store = createStore(reducer);

class App extends Component {
    render() {
        return (
            <Provider store={store}>
                <HashRouter>
                    <div className="container py-3">
                        <Switch>
                            <Route exact path='/brand/:brand_id' component={Models}/>
                            <Route exact path='/brand' component={Brands}/>
                            <Route path="*" render={() => (<Redirect to="/brand"/>)}/>
                        </Switch>
                    </div>
                </HashRouter>
            </Provider>
        );
    }
}

export default App;
