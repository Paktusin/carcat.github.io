import React from 'react';
import actions from "../../actions";
import axios from "axios";
import Brand from "./Brand";

class Brands extends React.Component {
    state = {
        brands: []
    };

    componentDidMount() {
        axios(actions.API_URL + 'brand/').then(res => {
            this.setState({...this.state, brands: res.data})
        });
    }

    render() {
        return (
            <div className="row brand-list">
                {this.state.brands.map(brand => <Brand key={brand.id} brand={brand}/>)}
            </div>
        )
    }
}

export default Brands;