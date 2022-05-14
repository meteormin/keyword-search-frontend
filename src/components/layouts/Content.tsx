import React from 'react';
import { Col, Container, Row } from 'react-bootstrap';

export interface ContentProps {
  header: string;
  subject: string;
  children?: React.ReactNode | React.ReactNode[];
}

const Content = ({ header, subject, children }: ContentProps) => {
  return (
    <Container fluid className="px-4">
      <h1 className="mt-4">{header}</h1>
      <ol className="breadcrumb mb-4">
        <li className="breadcrumb-item active">{subject}</li>
      </ol>
      <Row>
        <Col xl={12}>{children}</Col>
      </Row>
    </Container>
  );
};

export default Content;
