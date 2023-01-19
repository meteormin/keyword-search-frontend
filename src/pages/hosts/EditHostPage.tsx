import React, { useEffect } from 'react';
import { useParams } from 'react-router';
import { Col, Container, Row } from 'react-bootstrap';
import HostCard from '../../components/hosts/HostCard';
import hostStore from 'store/features/hosts';
import { useDispatch, useSelector } from 'react-redux';

const EditHostPage = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const { select } = useSelector(hostStore.getState);

  useEffect(() => {
    if (id) {
      const hostId = parseInt(id);

      dispatch(hostStore.actions.find(hostId));
    }
  }, []);

  return (
    <Container>
      <Row>
        <Col>{select ? <HostCard host={select} /> : null}</Col>
      </Row>
    </Container>
  );
};

export default EditHostPage;
