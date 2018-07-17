import React from 'react';
import Brand from "./Brand";
import './brandList.css'
import {connect} from "react-redux";
import Actions from "../../actions";
import Aux from "../../Aux";

class BrandList extends React.Component {
    state = {
        search: ''
    };

    componentDidMount() {
        Actions.getBrands();
    }

    searchChange(e) {
        this.setState({search: e.target.value})
    }

    render() {
        let brands = this.props.brands;
        if (this.state.search.length > 0) brands = brands.filter(brand => brand.name.toLowerCase().indexOf(this.state.search.toLowerCase()) !== -1);
        return (
            <Aux>
                <input className="search" placeholder={'Поиск...'} value={this.state.search}
                       onChange={this.searchChange.bind(this)}/>
                <div className="row brand-list m-0">
                    <div className="col-12 p-0">
                        {brands.map(brand => <Brand key={brand.id} brand={brand}/>)}
                    </div>
                </div>
            </Aux>
        )
    }
}

export default connect(
    (state) => ({
        brands: state.brands
    })
)(BrandList);