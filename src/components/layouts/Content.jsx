import React from 'react';
import propTypes from 'prop-types';
import Footer from './Footer';
import Loading from '../Loading';
import AlertModal from '../AlertModal';

const Content = ({ header, subject, children, footer }) => {
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
        <Loading />
        <AlertModal />
      </main>
      <Footer year={year} {...footer} />
    </div>
  );
};

Content.propTypes = {
  header: propTypes.string,
  subject: propTypes.string,
  children: propTypes.element,
  footer: propTypes.shape({
    company: propTypes.string,
    privacyUrl: propTypes.string,
    termsUrl: propTypes.string,
  }),
};

export default Content;
