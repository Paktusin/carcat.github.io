import React from 'react'
import PropTypes from 'prop-types'

const Card = (props) => {
    const title = props.title ? <div className="card-title">{props.title}</div> : null;
    return React.createElement((props.href) ? 'a' : 'div', {
            href: props.href,
            className: "card col-12 col-sm-6 col-md-4 col-lg-3"
        },
        (<div className="card-body">
            {title}
            {props.children}
        </div>)
    );
};

Card.propTypes = {
    href: PropTypes.string,
    image: PropTypes.string,
    title: PropTypes.string,
};

export default Card;
