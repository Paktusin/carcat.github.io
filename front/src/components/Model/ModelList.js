import React from 'react';
import PropTypes from 'prop-types';
import Card from "../Card/Card";
import RandomImage from "../RandomImage";
import './modelList.css';
import Actions from "../../actions";
import {connect} from "react-redux";
import BackBtn from "../BackBtn/BackBtn";
import Aux from "../Aux";

class ModelList extends React.Component {
    constructor(props) {
        super(props);
        this.brands_id = this.props.match.params.brand_id;
    }

    componentDidMount() {
        Actions.getModels(this.brands_id)
    }

    imageLoad(e) {
        e.target.closest('.fader').classList.add('in')
    }

    render() {
        return (
            <Aux>
                <BackBtn url={`#/brand`} text={'Брэнды'}/>
                <div className="row model-list justify-content-center">
                    {this.props.models.map(model =>
                        <div key={model.id} className={'col-12 col-sm-6 col-md-4 col-lg-3 col-xl-2 p-0 fader'}>
                            <Card title={model.name} href={`#/model/${model.id}`}>
                                <RandomImage size={'m'} object={model} imageLoad={this.imageLoad}/>
                            </Card>
                        </div>
                    )}
                </div>
            </Aux>
        )
    }
}

ModelList.propTypes = {
    brand_id: PropTypes.number
};

export default connect((store) => ({models: store.models}))(ModelList);