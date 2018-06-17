import React from 'react'
import PropTypes from 'prop-types'

const Card = (props) => {
    let className = "mb-3 ";
    className += props.className || "col-12 col-sm-6 col-md-4";
    const title = props.title ? <h5 className="card-title">{props.title}</h5> : null;
    const card = React.createElement((props.href) ? 'a' : 'div', {href: props.href, className: "card"},
        (<div className="card-body">
            {title}
            {props.children}
        </div>)
    );
    return (
        <div className={className}>
            {card}
        </div>
    );
};

Card.propTypes = {
    href: PropTypes.string,
    image: PropTypes.string,
    title: PropTypes.string,
};

export default Card;
