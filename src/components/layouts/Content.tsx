import React from 'react';

export interface ContentProps {
  header: string;
  subject: string;
  children?: React.ReactNode | React.ReactNode[];
}

const Content = ({ header, subject, children }: ContentProps) => {
  return (
    <div className="container-fluid px-4">
      <h1 className="mt-4">{header}</h1>
      <ol className="breadcrumb mb-4">
        <li className="breadcrumb-item active">{subject}</li>
      </ol>
      <div className="row">
        <div className="col-xl-12">{children}</div>
      </div>
    </div>
  );
};

export default Content;
