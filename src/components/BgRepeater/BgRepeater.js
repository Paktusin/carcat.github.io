import React from 'react';
import PropTypes from 'prop-types';
import './BgRepeater.css'

const BgRepeater = (props) => {
    const style = {backgroundImage: `url(${props.image.replace('.jpg','l.jpg')})`};
    return (
        <div className={"bg-repeater"} style={style}/>
    );
};

BgRepeater.propTypes = {
    image: PropTypes.string
};

export default BgRepeater;