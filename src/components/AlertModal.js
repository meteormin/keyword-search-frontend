import React, { Fragment } from 'react';
import { Modal, Button } from 'react-bootstrap';
import propTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { close } from '../services/features/alertModal';

const AlertModal = () => {
  const { title, message, show } = useSelector((state) => state.alertModal);
  const dispatch = useDispatch();
  const handleClose = () => dispatch(close());

  return (
    <Fragment>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>{title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>{message}</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            닫기
          </Button>
          {/*<Button variant="primary" onClick={handleClose}>*/}
          {/*  Save Changes*/}
          {/*</Button>*/}
        </Modal.Footer>
      </Modal>
    </Fragment>
  );
};

AlertModal.propTypes = {
  title: propTypes.string,
  message: propTypes.string,
};

export default AlertModal;
