import React, { Fragment } from 'react';
import { ReactElementLike } from 'prop-types';
import { Navigate } from 'react-router';

export interface RestrictedProps {
  condition: boolean;
  children: ReactElementLike;
  redirectPath?: string;
}

/**
 * 조건에 따라 컴포넌트 렌더링을 하거나 하지 않는다.
 * @param {boolean} condition true: 렌더링하지 않음, false: 렌더링
 * @param {JSX.Element} children
 * @param {string|null} redirectPath
 * @returns {*|JSX.Element}
 * @constructor
 */
const Restricted = ({ condition, children, redirectPath }: RestrictedProps) => {
  if (!condition) {
    return children;
  }

  if (redirectPath != null) {
    return <Navigate to={redirectPath} />;
  }

  return <Fragment></Fragment>;
};

export default Restricted;
