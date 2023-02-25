import React, { useEffect } from 'react';
import { useParams } from 'react-router';
import { Col, Container, Row } from 'react-bootstrap';
import HostCard from 'components/hosts/HostCard';
import hostStore from 'store/features/hosts';
import { useDispatch, useSelector } from 'react-redux';
import { PatchHost } from 'api/clients/Hosts';
import { FormHost } from 'components/hosts/HostForm';

const EditHostPage = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const { select } = useSelector(hostStore.getState);

  const handleEdit = (edit: FormHost) => {
    const hostId = edit.id;
    const patchHost: PatchHost = {
      host: edit?.host,
      subject: edit?.subject,
      description: edit?.description,
      path: edit?.path,
      publish: edit?.publish,
    };

    dispatch(hostStore.actions.patch({ id: hostId, host: patchHost }));
  };

  useEffect(() => {
    if (id) {
      const hostId = parseInt(id);

      dispatch(hostStore.actions.find(hostId));
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
