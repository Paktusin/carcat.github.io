import React from 'react'
import PropTypes from 'prop-types'
import './Card.scss'

const Card = (props) => {
    const title = props.title ? <div className="card-title"><span>{props.title}</span></div> : null;
    return React.createElement((props.href) ? 'a' : 'div', {
            href: props.href,
            className: "card"
        },
        (<div className="card-body">
            {props.children}
            {title}
        </div>)
    );
};

Card.propTypes = {
    href: PropTypes.string,
    title: PropTypes.string,
    className: PropTypes.string,
};

export default Card;
