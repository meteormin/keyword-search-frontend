import React, { useEffect, useState } from 'react';
import Card from 'components/common/Card';
import { Host } from 'api/interfaces/Hosts';
import { Button, Col, Row } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { useHostState } from 'components/hosts/utils';
import HostForm, { FormHost } from 'components/hosts/HostForm';

export interface HostCardProps {
  host: Host;
  readOnly?: boolean;
  onChange?: (host: FormHost | null) => any;
  onEdit?: (host: FormHost) => any;
  onDelete?: (host: FormHost) => any;
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

  const handleChange = (ch: FormHost | null) => {
    if (ch) {
      setHost(ch);
    }
  };

  const handleSearch = () => {
    navigate(`/hosts/${host.id}/search`);
  };

  const handleEdit = () => {
    if (readOnly) {
      navigate(`/hosts/${host.id}`);
      return;
    }

    if (onEdit && formHost != null) {
      onEdit(formHost);
    }
  };

  const handleDelete = () => {
    if (onDelete && formHost != null) {
      onDelete(formHost);
    }
    return;
  };

  useEffect(() => {
    setHost(host);
  }, []);

  useEffect(() => {
    setHost(host);
  }, [host]);

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
      <HostForm host={host} onChange={handleChange} readOnly={readOnly} />
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
