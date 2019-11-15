import axios from 'axios';
import {createStore} from "redux";
import reducer from "./reducer";
import firebase from "firebase";

export const actions = {
    SET_BRANDS: 'SET_BRANDS',
    SET_BRAND: 'SET_BRAND',
    SET_MODELS: 'SET_MODELS',
    SET_MODEL: 'SET_MODEL',
    API_URL: 'https://carcat-3a3fb.firebaseio.com/'
};

const setBodyClass = (name) => {
    document.body.className = name.toLowerCase();
};


firebase.initializeApp(firebaseConfig);
export const store = createStore(reducer);
const database = firebase.database();

const where = (ref, key, value) => {
    return ref.orderByChild(key).equalTo(value).once('value')
};

function toArr(object) {
    return Object.keys(object).reduce((prev, key) => ([...prev, object[key]]), [])
}

const Actions = {
    getBrands() {
        setBodyClass('');
        store.dispatch({type: actions.SET_BRANDS, value: []});
        database.ref(`/brand`).once('value').then(snapshot => {
            store.dispatch({type: actions.SET_BRANDS, value: snapshot.val()});
        })
    },
    getBrand(id) {
        if (store.brand && store.brand.id) return true;
        store.dispatch({type: actions.SET_BRAND, value: null});
        database.ref(`/brand/${id}`).once('value').then(snapshot => {
            const brand = snapshot.val();
            setBodyClass(brand.name);
            store.dispatch({type: actions.SET_BRAND, value: brand})
        });
    },
    getModels(brand_id) {
        if (store.brand && store.brand.id === brand_id) return true;
        this.getBrand(brand_id);
        store.dispatch({type: actions.SET_MODELS, value: []});
        where(database.ref('/model'), 'brand_id', parseInt(brand_id)).then(snapshot => {
            const models = toArr(snapshot.val());
            const randomModel = models[Math.floor(Math.random() * models.length)];
            console.log(models);
            where(database.ref('/gen'), 'model_id', parseInt(randomModel.id)).then(snapshot => {
                randomModel.gens = toArr(snapshot.val());
                const randomGen = randomModel.gens[Math.floor(Math.random() * randomModel.gens.length)];
                where(database.ref('/body'), 'gen_id', parseInt(randomGen.id)).then(snapshot => {
                    randomGen.bodies = toArr(snapshot.val());
                    store.dispatch({type: actions.SET_MODELS, value: models})
                })
            });
        });
    },
    getModel(id) {
        if (store.model && store.model.id === id) return true;
        else
            axios(actions.API_URL + `model/${id}`).then(res => {
                setBodyClass(res.data.brand.name);
                store.dispatch({type: actions.SET_MODEL, value: res.data});
                store.dispatch({type: actions.SET_BRAND, value: res.data.brand});
            });
    }
};

export default Actions;
