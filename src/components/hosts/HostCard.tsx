import React from 'react';
import Card from '../common/Card';
import { Host } from '../../api/interfaces/Hosts';
import { Button, Col, Row } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

export interface HostCardProps {
  host: Host;
}

const HostCard = ({ host }: HostCardProps) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/hosts/${host.id}/search`);
  };

  const handleEdit = () => {
    navigate(`/hosts/${host.id}`);
  };

  return (
    <Card header={host.subject}>
      <div style={{ cursor: 'pointer' }} onClick={handleClick}>
        <Row>
          <Col>
            <p>{host.description}</p>
          </Col>
        </Row>
        <hr />
        <Row>
          <p>host: {host.host}</p>
        </Row>
        <Row>
          <p>path: {host.path}</p>
        </Row>
      </div>
      <hr />
      <Row>
        <Col className="align-content-end">
          <Button className="float-end w-25" onClick={handleEdit}>
            Edit
          </Button>
        </Col>
      </Row>
    </Card>
  );
};

export default HostCard;
