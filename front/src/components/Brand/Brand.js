import React from 'react';
import PropTypes from 'prop-types';
import './Brand.css'

const Brand = (props) => {
    return (
        <a className="brand" href={`#/brand/${props.brand.id}`}>
            <h1 className="p-3 text-center">{props.brand.logo &&
            <img alt={props.brand.name + " logo"} className={"logo"} src={props.brand.logo}/>}{props.brand.name}</h1>
        </a>
    );
};

Brand.propTypes = {
    brand: PropTypes.object,
};

export default Brand;