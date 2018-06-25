import axios from 'axios';
import {createStore} from "redux";
import reducer from "./reducer";

export const actions = {
    SET_BRANDS: 'SET_BRANDS',
    SET_BRAND: 'SET_BRAND',
    SET_MODELS: 'SET_MODELS',
    SET_MODEL: 'SET_MODEL',
    API_URL: 'http://0s.mnqxey3boq.nbsxe33lovqxa4bomnxw2.cmle.ru/'
};

export const store = createStore(reducer);

const Actions = {
    getBrands() {
        store.dispatch({type: actions.SET_BRANDS, value: []});
        axios(actions.API_URL + 'brand/').then(res => {
            store.dispatch({type: actions.SET_BRANDS, value: res.data});
        });
    },
    getBrand(id) {
        if (store.brand && store.brand.id) return true;
        store.dispatch({type: actions.SET_BRAND, value: null});
        axios(actions.API_URL + `brand/`, {params: {id}}).then(res => {
            store.dispatch({type: actions.SET_BRAND, value: res.data})
        });
    },
    getModels(brand_id) {
        if (store.brand && store.brand.id === brand_id) return true;
        this.getBrand(brand_id);
        store.dispatch({type: actions.SET_MODELS, value: []});
        axios(actions.API_URL + `model/`, {params: {brand_id}}).then(res => {
            store.dispatch({type: actions.SET_MODELS, value: res.data})
        });
    },
    getModel(id) {
        if (store.model && store.model.id === id) return true;
        else
            axios(actions.API_URL + `model/${id}`).then(res => {
                store.dispatch({type: actions.SET_MODEL, value: res.data});
                store.dispatch({type: actions.SET_BRAND, value: res.data.brand});
            });
    }
};

export default Actions;