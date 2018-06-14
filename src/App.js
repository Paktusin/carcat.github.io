import React, {Component} from 'react';
import './App.css';
import Brands from './components/Brand/Brands'
import {createStore} from 'redux'
import {Provider} from "react-redux";
import reducer from "./reducer";

const store = createStore(reducer);

class App extends Component {
    render() {
        return (
            <Provider store={store}>
                <div className="container">
                    <Brands/>
                </div>
            </Provider>
        );
    }
}

export default App;
