import actions from './actions'

const initialState = {
    brands: [],
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actions.SET_BRANDS:
            return {...state, brands: action.value};
        default:
            return state;
    }
};

export default reducer;