import React, {Component} from 'react';
import './App.css';
import BrandList from './components/Brand/BrandList'
import {Provider} from "react-redux";
import {HashRouter, Redirect, Route, Switch} from "react-router-dom";
import ModelList from "./components/Model/ModelList";
import Gens from "./components/Gen/Gens";
import {store} from './actions';

class App extends Component {
    render() {
        return (
            <Provider store={store}>
                <HashRouter>
                    <div className="container-fluid">
                        <Switch>
                            <Route exact path='/model/:model_id' component={Gens}/>
                            <Route exact path='/brand/:brand_id' component={ModelList}/>
                            <Route exact path='/brand' component={BrandList}/>
                            <Route path="*" render={() => (<Redirect to="/brand"/>)}/>
                        </Switch>
                    </div>
                </HashRouter>
            </Provider>
        );
    }
}

export default App;
