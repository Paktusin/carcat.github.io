import React from 'react';

const RandomImage = (props) => {
    const src = getSrcFromObject(props.object);
    let style = {backgroundSize: 'cover', backgroundPosition: 'center', minHeight:'200px'};
    if (src) style.backgroundImage = `url(${src})`;
    return (
        <div className="image img-fluid" style={style}/>
    );
};

const getSrcFromObject = (object) => {
    if (Array.isArray(object)) return getSrcFromObject(object[Math.floor(Math.random() * object.length)]);
    if (object.hasOwnProperty('gens')) return getSrcFromObject(object.gens);
    if (object.hasOwnProperty('bodies')) return getSrcFromObject(object.bodies);
    if (object.hasOwnProperty('images')) return object.images;
    return null;
};

export default RandomImage;