import React from 'react';
import {connect} from 'react-redux';
import actions from "../../actions";
import axios from "axios";
import Brand from "./Brand";

class Brands extends React.Component {
    componentDidMount() {
        axios(actions.API_URL + 'brand/').then(res => {
            this.props.setBrands(res.data)
        });
    }

    render() {
        return (
            <div className="row">
                {this.props.brands.map(brand => <Brand key={brand.id} brand={brand}/>)}
            </div>
        )
    }
}

export default connect(
    (state) => ({brands: state.brands}),
    (dispatch) => ({
        setBrands: (brands) => dispatch({
            type: actions.SET_BRANDS,
            value: brands
        })
    }))(Brands);