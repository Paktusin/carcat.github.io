import React from 'react';
import Actions from "../../actions";
import {connect} from "react-redux";
import Gen from "./Gen";


class Gens extends React.Component {
    model_id = this.props.match.params.model_id;

    componentDidMount() {
        Actions.getModel(this.model_id);
    }

    selectBody(body_id) {
        this.props.history.push('?body_id=' + body_id)
    }

    render() {
        return this.props.model &&
            this.props.model.id === parseInt(this.model_id, 10) &&
            this.props.model.gens.map(gen => <Gen
                model_id={this.props.model.id}
                selectBody={this.selectBody.bind(this)}
                key={gen.id}
                gen={gen}/>)
    }
}

export default connect(store => ({model: store.model}))(Gens);