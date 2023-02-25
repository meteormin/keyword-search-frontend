import React, { useEffect, useState } from 'react';
import { Form } from 'react-bootstrap';
import { FormHostKeys, setFormHostByKey } from 'components/hosts/utils';

export interface FormHost {
  id: number;
  userId: number;
  subject?: string;
  description?: string;
  host?: string;
  path?: string;
  publish?: boolean;
}

export interface HostFormProps {
  readOnly?: boolean;
  onChange?: (host: FormHost | null) => any;
  host?: FormHost | null;
}

const HostForm = ({ readOnly, onChange, host }: HostFormProps) => {
  const [formHost, setFormHost] = useState<FormHost | null>(null);

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
    setFormHost(ch);
  };

  useEffect(() => {
    setFormHost(host || null);
  }, [host]);

  useEffect(() => {
    if (onChange) {
      onChange(formHost);
    }
  }, [formHost]);

  return (
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
              handleFormChange(FormHostKeys.publish, e.target.checked);
            }}
          />
        </Form.Group>
      </Form>
    </div>
  );
};

export default HostForm;
