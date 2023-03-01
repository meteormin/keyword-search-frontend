import React, { useEffect } from 'react';
import { useParams } from 'react-router';
import { Col, Container, Row } from 'react-bootstrap';
import HostCard from 'components/hosts/HostCard';
import { useHostDispatch, useHostState } from 'store/features/hosts';
import { PatchHost } from 'api/clients/Hosts';
import { FormHost } from 'components/hosts/HostForm';

const EditHostPage = () => {
  const { patch, find } = useHostDispatch();

  const { id } = useParams();
  const { select } = useHostState();

  const handleEdit = (edit: FormHost) => {
    const hostId = edit.id;
    const patchHost: PatchHost = {
      host: edit?.host,
      subject: edit?.subject,
      description: edit?.description,
      path: edit?.path,
      publish: edit?.publish,
    };

    patch(hostId, patchHost);
  };

  useEffect(() => {
    if (id) {
      const hostId = parseInt(id);
      find(hostId);
    }
  }, []);

  return (
    <Container className="mt-4">
      <Row>
        <Col>
          {select ? <HostCard host={select} onEdit={handleEdit} /> : null}
        </Col>
      </Row>
    </Container>
  );
};

export default EditHostPage;
