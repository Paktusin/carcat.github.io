import React from 'react';
import actions from "../../actions";
import axios from "axios";
import PropTypes from 'prop-types';


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