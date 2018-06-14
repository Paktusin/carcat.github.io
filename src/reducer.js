import actions from './actions'

const initialState = {
    brands: [],
    models: [],
    gens: [],
    bodies: [],
    mods: []
};

const reducer = (state = initialState, action) => {
    console.log(action);
    switch (action.type) {
        case actions.SET_BRANDS:
            return {...state, brands: action.value};
        case actions.SET_MODELS:
            return {...state, models: action.value};
        default:
            return state;
    }
};

export default reducer;