import React from 'react';
import {connect} from 'react-redux';
import actions from "../../actions";
import axios from "axios";
import PropTypes from 'prop-types';
import Gen from "./Gen";


class Gens extends React.Component {
    state = {
        model: null
    };

    componentDidMount() {
        axios(actions.API_URL + `model/${this.props.match.params.model_id}`).then(res => {
            this.setState({...this.state, model: res.data});
        });
    }

    render() {

        return (
            <div className="row">
                {this.state.model.brand.name}
            </div>
        )
    }
}

Gens.propTypes = {
    model_id: PropTypes.number
};

export default Gens;