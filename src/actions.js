import axios from 'axios';
import {createStore} from "redux";
import reducer from "./reducer";

export const actions = {
    SET_BRANDS: 'SET_BRANDS',
    SET_MODELS: 'SET_MODELS',
    SET_GENS: 'SET_GENS',
    SET_BODIES: 'SET_BODIES',
    SET_MODS: 'SET_MODS',
    API_URL: 'https://carcat.herokuapp.com/'
};

export const store = createStore(reducer);

const Actions = {
    getBrands() {
        axios(actions.API_URL + 'brand/').then(res => {
            store.dispatch({type: actions.SET_BRANDS, value: res})
        });
    },
    getModels(brand_id) {
        axios(actions.API_URL + `model/`, {brand_id}).then(res => {
            store.dispatch({type: actions.SET_MODELS, value: res})
        });
    }
};

export default Actions;