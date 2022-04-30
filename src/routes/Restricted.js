import React, { Fragment } from 'react';
import PropTypes from 'prop-types';

/**
 * 조건에 따라 컴포넌트 렌더링을 하거나 하지 않는다.
 * @param {bool} condition true: 렌더링하지 않음, false: 렌더링
 * @param {JSX.Element} children
 * @returns {*|JSX.Element}
 * @constructor
 */
const Restricted = ({ condition, children }) => {
  return !condition ? children : <Fragment></Fragment>;
};

Restricted.propTypes = {
  condition: PropTypes.bool,
  children: PropTypes.element,
};

export default Restricted;
