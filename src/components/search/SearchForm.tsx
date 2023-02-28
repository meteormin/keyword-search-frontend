import React, { useEffect, useState } from 'react';
import { FormSearchKeys, setFormSearchByKey } from './utils';
import { Form } from 'react-bootstrap';

export interface FormSearch {
  id?: number;
  publish?: boolean;
  query?: string;
  queryKey?: string;
  description?: string;
  hostId: number;
}

export interface SearchFormProps {
  readOnly?: boolean;
  onChange?: (search: FormSearch | null) => any;
  search?: FormSearch | null;
}

const SearchForm = ({ readOnly, onChange, search }: SearchFormProps) => {
  const [formData, setFormData] = useState<FormSearch | null>(search || null);

  const styleCursor = () => {
    if (readOnly != undefined) {
      return { cursor: 'pointer' };
    }
  };

  const handleFormChange = (
    property: string,
    value: string | number | boolean,
  ) => {
    let ch = Object.assign({}, formData);
    ch = setFormSearchByKey(ch, property, value);
    setFormData(ch);
  };

  useEffect(() => {
    if (onChange) {
      onChange(formData);
    }
  }, [formData]);

  return (
    <div style={styleCursor()}>
      <Form>
        <Form.Group className="mb-3" controlId="subject">
          <Form.Label>Description</Form.Label>
          <Form.Control
            type="text"
            readOnly={readOnly != undefined}
            value={formData?.description || ''}
            onChange={(e) => {
              handleFormChange(FormSearchKeys.description, e.target.value);
            }}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="description">
          <Form.Label>QueryKey</Form.Label>
          <Form.Control
            type="text"
            readOnly={readOnly != undefined}
            value={formData?.queryKey || ''}
            onChange={(e) => {
              handleFormChange(FormSearchKeys.queryKey, e.target.value);
            }}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="host">
          <Form.Label>Query</Form.Label>
          <Form.Control
            type="text"
            placeholder="query"
            readOnly={readOnly != undefined}
            value={formData?.query || ''}
            onChange={(e) => {
              handleFormChange(FormSearchKeys.query, e.target.value);
            }}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="host">
          <Form.Label>HostId</Form.Label>
          <Form.Control
            type="text"
            placeholder="query"
            readOnly={true}
            value={formData?.hostId || ''}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="publish">
          <Form.Check
            type="switch"
            disabled={readOnly != undefined}
            id="publish"
            label="Publish"
            checked={!!formData?.publish}
            onChange={(e) => {
              handleFormChange(FormSearchKeys.publish, e.target.checked);
            }}
          />
        </Form.Group>
      </Form>
    </div>
  );
};

export default SearchForm;
