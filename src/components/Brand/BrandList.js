import React from 'react';
import Brand from "./Brand";
import './brandList.css'
import {connect} from "react-redux";
import Actions from "../../actions";

class BrandList extends React.Component {
    componentDidMount() {
        Actions.getBrands();
    }

    render() {
        return (
            <div className="row brand-list">
                {this.props.brands.map(brand => <Brand key={brand.id} brand={brand}/>)}
            </div>
        )
    }
}

export default connect(
    (state) => ({
        brands: state.brands
    })
)(BrandList);