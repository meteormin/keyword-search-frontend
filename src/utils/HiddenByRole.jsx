// 권한 따라 보여줄거 아닌거 체크
import Restricted from './Restricted';
import propTypes from 'prop-types';
import React from 'react';

const HiddenByRole = ({ children, handleCondition }) => {
  return <Restricted condition={handleCondition()}>{children}</Restricted>;
};

HiddenByRole.propTypes = {
  children: propTypes.element,
  handleCondition: propTypes.func,
};

export default HiddenByRole;
