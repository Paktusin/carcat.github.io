import React from 'react'
import PropTypes from 'prop-types'

const Card = (props) => {
    const title = props.title ? <h5 className="card-title">{props.title}</h5> : null;
    const card = React.createElement((props.href) ? 'a' : 'div', {href: props.href, className: "card"},
        (<div className="card-body">
            {title}
            {props.children}
        </div>)
    );
    return (
        <div className="col-12 col-sm-6 col-md-4 col-lg-3 mb-3">
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
