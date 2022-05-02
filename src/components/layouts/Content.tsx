import React from 'react';
import Footer from './Footer';
import Loading from '../Loading';
import AlertModal from '../AlertModal';

export interface ContentProps {
  header: string;
  subject: string;
  children?: React.ReactNode | React.ReactNode[];
  footer?: {
    company: string;
    privacyUrl: string;
    termsUrl: string;
  };
}

const Content = ({ header, subject, children, footer }: ContentProps) => {
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

export default Content;
