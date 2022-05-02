import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { Navigate } from 'react-router';

/**
 * 조건에 따라 컴포넌트 렌더링을 하거나 하지 않는다.
 * @param {boolean} condition true: 렌더링하지 않음, false: 렌더링
 * @param {JSX.Element} children
 * @param {string|null} redirectPath
 * @returns {*|JSX.Element}
 * @constructor
 */
const Restricted = ({ condition, children, redirectPath = null }) => {
  if (!condition) {
    return children;
  }

  if (redirectPath != null) {
    return <Navigate to={redirectPath} />;
  }

  return <Fragment></Fragment>;
};

Restricted.propTypes = {
  condition: PropTypes.bool,
  children: PropTypes.element,
  redirectPath: PropTypes.string,
};

export default Restricted;
