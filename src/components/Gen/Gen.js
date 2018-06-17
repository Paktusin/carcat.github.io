import React from 'react';
import PropTypes from 'prop-types';

const Gen = (props) => {
    return (
        <div className="col-12">
            <span>{props.gen.title}</span>
        </div>
    );
};

Gen.propTypes = {
    model: PropTypes.object,
};

export default Gen;