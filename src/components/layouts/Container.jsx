import React from 'react';
import propTypes from 'prop-types';
import Navigator from './Navigator';

const Container = ({ menu, children }) => {
  return (
    <div id="layoutSidenav">
      <Navigator menu={menu} />
      {children}
    </div>
  );
};

Container.propTypes = {
  header: propTypes.string,
  subject: propTypes.string,
  children: propTypes.element,
  menu: Navigator.propTypes.menu,
  footer: propTypes.shape({
    company: propTypes.string,
    privacyUrl: propTypes.string,
    termsUrl: propTypes.string,
  }),
};

export default Container;
