import React from 'react';
import PropTypes from 'prop-types';
import Card from "../Card";
import RandomImage from "../RandomImage";
import './modelList.css';
import Actions from "../../actions";
import {connect} from "react-redux";

class ModelList extends React.Component {
    constructor(props) {
        super(props);
        this.brands_id = this.props.match.params.brand_id
    }

    componentDidMount() {
        Actions.getModels(this.brands_id)
    }

    render() {
        return (
            <div className="row model-list">
                {this.props.models.map(model => <Card key={model.id} title={model.name} href={`#/model/${model.id}`}>
                    <RandomImage size={'m'} object={model}/>
                </Card>)}
            </div>
        )
    }
}

ModelList.propTypes = {
    brand_id: PropTypes.number
};

export default connect((store) => ({models: store.models}))(ModelList);