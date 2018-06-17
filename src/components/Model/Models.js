import React from 'react';
import actions from "../../actions";
import axios from "axios";
import PropTypes from 'prop-types';
import Model from "./Model";
import Card from "../Card";
import RandomImage from "../RandomImage";


class Models extends React.Component {
    state = {
        models: []
    };

    componentDidMount() {
        axios(actions.API_URL + `model/?brand_id=${this.props.match.params.brand_id}`).then(res => {
            this.setState({...this.state, models: res.data});
        });
    }

    render() {
        return (
            <div className="row model-list">
                {this.state.models.map(model => <Card title={model.name} href={`#/model/${model.id}`}>
                    <RandomImage object={model}/>
                </Card>)}
            </div>
        )
    }
}

Models.propTypes = {
    brand_id: PropTypes.number
};

export default Models;