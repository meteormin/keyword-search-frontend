import React, { useEffect } from 'react';
import { useParams } from 'react-router';
import { Col, Container, Row } from 'react-bootstrap';
import HostCard, { FormHost } from '../../components/hosts/HostCard';
import hostStore from 'store/features/hosts';
import { useDispatch, useSelector } from 'react-redux';

const EditHostPage = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const { select } = useSelector(hostStore.getState);

  const handleEdit = (edit: FormHost) => {
    console.log(edit);
  };

  useEffect(() => {
    if (id) {
      const hostId = parseInt(id);

      dispatch(hostStore.actions.find(hostId));
    }
  }, []);

  return (
    <Container>
      <Row>
        <Col>
          {select ? <HostCard host={select} onEdit={handleEdit} /> : null}
        </Col>
      </Row>
    </Container>
  );
};

export default EditHostPage;
