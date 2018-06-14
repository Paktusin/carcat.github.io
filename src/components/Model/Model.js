import React from 'react';
import PropTypes from 'prop-types';
import Card from "../Card";

const Model = (props) => {
    return (
        <Card title={props.model.name} href={`#/model/${props.model.id}`}>
        </Card>
    );
};

Model.propTypes = {
    model: PropTypes.object,
};

export default Model;