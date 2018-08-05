import React from 'react';
import PropTypes from 'prop-types';
import './BgRepeater.css'
import Aux from "../Aux";

const BgRepeater = (props) => {
    const style = {backgroundImage: `url(${props.image.replace('.jpg', 'l.jpg')})`};
    return (
        <Aux>
            <img style={{display:'none'}} alt={"some car"} src={props.image.replace('.jpg', 'l.jpg')} onLoad={props.imageLoad}/>
            <div className={"bg-repeater opac"} style={style}/>
        </Aux>
    );
};

BgRepeater.propTypes = {
    image: PropTypes.string
};

export default BgRepeater;