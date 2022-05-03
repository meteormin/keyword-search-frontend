import React from 'react';
import Restricted from './Restricted';
import { ReactElementLike } from 'prop-types';

export interface ProtectedProps {
  auth: boolean;
  children: ReactElementLike;
  redirectPath?: string;
}

/**
 * 로그인한 유저에게만 하위 컴포넌트 렌더링
 * @param {boolean} auth 로그인 여부, true면 허용 false면 redirect
 * @param {React.ReactNode|React.ReactNode[]} children 컴포넌트
 * @param {string} redirectPath 로그인 X 일때 리다이렉트 경로
 * @returns {*|JSX.Element}
 * @constructor
 */
const Protected = ({ auth, children, redirectPath }: ProtectedProps) => {
  return (
    <Restricted condition={!auth} redirectPath={redirectPath}>
      {children}
    </Restricted>
  );
};

export default Protected;
