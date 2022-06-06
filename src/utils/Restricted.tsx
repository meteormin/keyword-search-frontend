import React, { Fragment } from 'react';
import { ReactElementLike } from 'prop-types';
import { Navigate } from 'react-router';

export interface RestrictedProps {
  condition: boolean;
  children: ReactElementLike;
  redirect?: string | ReactElementLike;
}

/**
 * redirectPath와 render 속성이 모두 존재하느 경우 redirectPath를 우선 처리 되어 redirect 됩니다.
 * @param {RestrictedProps} props
 * @constructor
 */
const Restricted = (props: RestrictedProps) => {
  if (!props.condition) {
    return props.children;
  }

  if (props.redirect) {
    if (props.redirect instanceof String) {
      return <Navigate to={props.redirect as string} />;
    } else {
      return props.redirect as JSX.Element;
    }
  }

  return <Fragment></Fragment>;
};

export default Restricted;
