import React from 'react';
import {connect} from 'react-redux';
import actions from "../../actions";
import axios from "axios";
import PropTypes from 'prop-types';
import Model from "./Model";


class Models extends React.Component {
    componentDidMount() {
        this.props.setModels([]);
        axios(actions.API_URL + `model/?brand_id=${this.props.match.params.brand_id}`).then(res => {
            this.props.setModels(res.data);
        });
    }

    render() {
        return this.props.models.map(model => <Model key={model.id} model={model} />);
    }
}

Models.propTypes = {
    brand_id: PropTypes.number
};

export default connect(
    (state) => ({models: state.models}),
    (dispatch) => ({
        setModels: (models) => dispatch({
            type: actions.SET_MODELS,
            value: models
        })
    }))(Models);