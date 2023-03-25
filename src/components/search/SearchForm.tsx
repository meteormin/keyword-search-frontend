import React, { useEffect, useState } from 'react';
import { FormSearchKeys, setFormSearchByKey } from './utils';
import { Form } from 'react-bootstrap';
import { PreviewImage } from 'store/features/search/action';

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
  onChange?: (search: FormSearch | null, file: PreviewImage | null) => any;
  search?: FormSearch | null;
  previewImage?: PreviewImage | null;
}

const SearchForm = ({
  readOnly,
  onChange,
  search,
  previewImage,
}: SearchFormProps) => {
  const [formData, setFormData] = useState<FormSearch | null>(search || null);
  const [file, setFile] = useState<PreviewImage | null>(previewImage || null);

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

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if ('files' in e.target) {
      const files = e.target.files;
      if (files != null) {
        const file = files[0];
        const url = URL.createObjectURL(file);
        const filename = file.name;
        setFile({ url, filename });
      }
    }
  };

  useEffect(() => {
    if (onChange) {
      onChange(formData, file);
    }
  }, [formData, file]);

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
          <Form.Label>PreviewImage</Form.Label>
          <Form.Control
            type="file"
            readOnly={readOnly != undefined}
            accept="image/gif,image/jpeg,image/jpg,image/png"
            onChange={handleFileChange}
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
