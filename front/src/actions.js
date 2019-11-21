import axios from 'axios';
import {createStore} from "redux";
import reducer from "./reducer";

export const actions = {
    SET_BRANDS: 'SET_BRANDS',
    SET_BRAND: 'SET_BRAND',
    SET_MODELS: 'SET_MODELS',
    SET_MODEL: 'SET_MODEL',
    API_URL: 'http://localhost:5000'
};

const setBodyClass = (name) => {
    document.body.setAttribute('brand', name.toLowerCase());
};


export const store = createStore(reducer);

const Actions = {
    getBrands() {
        setBodyClass('');
        store.dispatch({type: actions.SET_BRANDS, value: []});
        axios.get(actions.API_URL + '/brand').then(res => {
            store.dispatch({type: actions.SET_BRANDS, value: res.data});
        })
    },
    getBrand(id) {
        if (store.brand) return true;
        store.dispatch({type: actions.SET_BRAND, value: null});
        axios.get(actions.API_URL + '/brand/' + id).then(res => {
            const brand = res.data;
            setBodyClass(brand.name);
            store.dispatch({type: actions.SET_BRAND, value: res.data});
        });
    },
    getModels(brand_id) {
        this.getBrand(brand_id);
        store.dispatch({type: actions.SET_MODELS, value: []});
        axios.get(actions.API_URL + '/model', {params: {brand_id}}).then(res => {
            store.dispatch({type: actions.SET_MODELS, value: res.data});
        })
    },
    getModel(id) {
        if (store.model && store.model.id === id) return true;
        axios.get(actions.API_URL + `/model/${id}`).then(res => {
            const model = res.data;
            this.getBrand(model.brand_id);
            store.dispatch({type: actions.SET_MODEL, value: model});
        });
    }
};

export default Actions;
