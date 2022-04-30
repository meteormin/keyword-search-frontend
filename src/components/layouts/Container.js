import React from 'react';
import propTypes from 'prop-types';
import Footer from './Footer';

const Container = ({ header, subject, children }) => {
  const year = new Date().getFullYear().toString();
  return (
    <div id="layoutSidenav_content">
      <main>
        <div className="container-fluid px-4">
          <h1 className="mt-4">{header}</h1>
          <ol className="breadcrumb mb-4">
            <li className="breadcrumb-item active">{subject}</li>
          </ol>
          <div className="row">
            <div className="col-xl-12">{children}</div>
          </div>
        </div>
      </main>
      <Footer company="TestWorks" year={year} privacyUrl="#" termsUrl="#" />
    </div>
  );
};

Container.propTypes = {
  header: propTypes.string,
  subject: propTypes.string,
  children: propTypes.element,
};

export default Container;
