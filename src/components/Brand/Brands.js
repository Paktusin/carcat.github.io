import React from 'react';
import {connect} from 'react-redux';
import actions from "../../actions";
import axios from "axios";

class Brands extends React.Component {
    componentDidMount() {
        axios(actions.API_URL + 'brand/').then(res => this.props.setBrands(res));
    }

    render() {
        return this.props.brands.map(brand => <h1>{brand.name}</h1>);
    }
};

export default connect(
    (state) => ({brands: state.brands}),
    (dispatch) => ({
        setBrands: (brands) => dispatch({
            type: actions.SET_BRANDS,
            value: brands
        })
    }))(Brands);