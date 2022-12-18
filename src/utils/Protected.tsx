import React from 'react';
import Restricted from 'utils/Restricted';
import { ReactElementLike } from 'prop-types';

export interface ProtectedProps {
  auth: boolean;
  children: ReactElementLike;
  redirect?: string | ReactElementLike;
}

/**
 *
 * @param {ProtectedProps} props
 * @constructor
 */
const Protected = (props: ProtectedProps) => {
  return (
    <Restricted condition={!props.auth} redirect={props.redirect}>
      {props.children}
    </Restricted>
  );
};

export default Protected;
