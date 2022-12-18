// 권한 따라 보여줄거 아닌거 체크
import Restricted from 'utils/Restricted';
import { ReactElementLike } from 'prop-types';
import React from 'react';

export interface HiddenByRoleProps {
  children: ReactElementLike;
  handleCondition: () => boolean;
}

const HiddenByRole = ({ children, handleCondition }: HiddenByRoleProps) => {
  return <Restricted condition={handleCondition()}>{children}</Restricted>;
};

export default HiddenByRole;
