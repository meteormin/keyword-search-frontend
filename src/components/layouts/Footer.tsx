import React from 'react';

export interface FooterProps {
  company: string;
  year: string;
  privacyUrl: string;
  termsUrl: string;
}

const Footer = ({ company, year, privacyUrl, termsUrl }: FooterProps) => {
  return (
    <div id="layoutAuthentication_footer">
      <footer className="py-4 bg-light mt-auto">
        <div className="container-fluid px-4">
          <div className="d-flex align-items-center justify-content-between small">
            <div className="text-muted">
              Copyright &copy; {company} {year}
            </div>
            <div>
              <a href={privacyUrl || '#'}>개인정보처리방침</a>
              &middot;
              <a href={termsUrl || '#'}>이용약관</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Footer;
