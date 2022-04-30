import React from 'react';
import { Navigate } from 'react-router';
import PropTypes from 'prop-types';

/**
 * 로그인한 유저에게만 경로 허용 결정
 * @param {bool} auth 로그인 여부, true면 허용 false면 redirect
 * @param {JSX.Element} children 컴포넌트
 * @param {string} redirectPath 로그인 X 일때 리다이렉트 경로
 * @returns {*|JSX.Element}
 * @constructor
 */
const Protected = ({ auth, children, redirectPath }) => {
  return auth ? children : <Navigate to={redirectPath} />;
};

Protected.propTypes = {
  auth: PropTypes.bool,
  children: PropTypes.element,
  redirectPath: PropTypes.string,
};

export default Protected;
