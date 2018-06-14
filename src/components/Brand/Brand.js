import React from 'react';
import PropTypes from 'prop-types';
import Card from "../Card";

const Brand = (props) => {
    return (
        <Card title={props.brand.name} href={`#/brand/${props.brand.id}`}>
        </Card>
    );
};

Brand.propTypes = {
    brand: PropTypes.object,
};

export default Brand;