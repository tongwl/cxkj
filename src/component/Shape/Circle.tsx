import React from 'react';
import PropTypes from 'prop-types';
import Color from '../../utils/Colors';
const Circle = props => {
    const {color, width, height, style} = props;
    return <span style={{
        display: 'inline-block',
        borderRadius: '50%',
        backgroundColor: color,
        width: width + 'px',
        height: height + 'px',
        ...style
    }}></span>;
}

Circle.defaultProps = {
    color: Color.Green,
    width: 12,
    height: 12
};

Circle.propTypes = {
    color: PropTypes.string,
    width: PropTypes.number,
    height: PropTypes.number,
    style: PropTypes.object
};

export default Circle;