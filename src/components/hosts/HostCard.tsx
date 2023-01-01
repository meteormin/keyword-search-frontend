import React, { useEffect, useState } from 'react';
import Card from 'components/common/Card';
import { Host } from 'api/interfaces/Hosts';
import { Button, Col, Form, Row } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import {
  useHostState,
  setFormHostByKey,
  FormHostKeys,
} from 'components/hosts/utils';

export interface HostCardProps {
  host: Host;
  readOnly?: boolean;
  onChange?: (host: FormHost | null) => any;
  onEdit?: (host: FormHost) => any;
  onDelete?: (host: FormHost) => any;
}

export interface FormHost {
  id: number;
  userId: number;
  subject?: string;
  description?: string;
  host?: string;
  path?: string;
  publish?: boolean;
}

const HostCard = ({
  readOnly,
  host,
  onEdit,
  onDelete,
  onChange,
}: HostCardProps) => {
  const navigate = useNavigate();
  const [formHost, setFormHost] = useState<FormHost | null>(null);
  const setHost = useHostState(host, setFormHost);

  const handleSearch = () => {
    navigate(`/hosts/${host.id}/search`);
  };

  const handleEdit = () => {
    if (readOnly == undefined) {
      navigate(`/hosts/${host.id}`);
      return;
    }

    if (onEdit && formHost != null) {
      onEdit(host);
    }
  };

  const handleDelete = () => {
    if (onDelete && formHost != null) {
      onDelete(formHost);
    }
    return;
  };

  const styleCursor = () => {
    if (readOnly != undefined) {
      return { cursor: 'pointer' };
    }
  };

  const handleFormChange = (
    property: string,
    value: string | number | boolean,
  ) => {
    let ch = Object.assign({}, formHost);
    ch = setFormHostByKey(ch, property, value);
    setHost(ch);
  };

  useEffect(() => {
    setFormHost(host);
  }, []);

  useEffect(() => {
    if (onChange) {
      onChange(formHost);
    }
  }, [formHost]);

  return (
    <Card
      header={
        <Row>
          <Col>{host.subject}</Col>
          <Col>
            <p
              className={
                'float-end ' + (readOnly != undefined ? 'text-danger' : '')
              }
            >
              {readOnly != undefined ? 'Read Only' : 'Edit'}
            </p>
          </Col>
        </Row>
      }
    >
      <div style={styleCursor()}>
        <Form>
          <Form.Group className="mb-3" controlId="subject">
            <Form.Label>Subject</Form.Label>
            <Form.Control
              type="text"
              readOnly={readOnly != undefined}
              value={formHost?.subject || ''}
              onChange={(e) => {
                handleFormChange(FormHostKeys.subject, e.target.value);
              }}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="description">
            <Form.Label>Description</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              readOnly={readOnly != undefined}
              value={formHost?.description || ''}
              onChange={(e) => {
                handleFormChange(FormHostKeys.description, e.target.value);
              }}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="host">
            <Form.Label>host</Form.Label>
            <Form.Control
              type="text"
              placeholder="host"
              readOnly={readOnly != undefined}
              value={formHost?.host || ''}
              onChange={(e) => {
                handleFormChange(FormHostKeys.host, e.target.value);
              }}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="path">
            <Form.Label>path</Form.Label>
            <Form.Control
              type="text"
              placeholder="path"
              readOnly={readOnly != undefined}
              value={formHost?.path || ''}
              onChange={(e) => {
                handleFormChange(FormHostKeys.path, e.target.value);
              }}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="publish">
            <Form.Check
              type="switch"
              disabled={readOnly != undefined}
              id="publish"
              label="Publish"
              checked={!!formHost?.publish}
              onChange={(e) => {
                handleFormChange(FormHostKeys.publish, e.target.value);
              }}
            />
          </Form.Group>
        </Form>
      </div>
      <hr />
      <Row>
        <Col>
          <Button
            variant="primary"
            className="float-end w-100"
            onClick={handleSearch}
          >
            Show Search
          </Button>
        </Col>
        <Col>
          <Button
            variant="success"
            className="float-end w-100"
            onClick={handleEdit}
          >
            Edit
          </Button>
        </Col>
        <Col>
          <Button
            variant="danger"
            className="float-end w-100"
            onClick={handleDelete}
          >
            Delete
          </Button>
        </Col>
      </Row>
    </Card>
  );
};
export default HostCard;
