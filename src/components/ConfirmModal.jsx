import React, { Fragment, useState } from 'react';
import { Modal, Button } from 'react-bootstrap';
import propTypes from 'prop-types';

const ConfirmModal = ({
  buttonText,
  title,
  message,
  confirmText,
  onConfirm,
}) => {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <Fragment>
      <Button variant="primary" onClick={handleShow}>
        {buttonText}
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>{title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>{message}</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            닫기
          </Button>
          <Button variant="primary" onClick={onConfirm}>
            {confirmText}
          </Button>
        </Modal.Footer>
      </Modal>
    </Fragment>
  );
};

ConfirmModal.propTypes = {
  buttonText: propTypes.string,
  title: propTypes.string,
  message: propTypes.string,
  confirmText: propTypes.string,
  onConfirm: propTypes.func,
};

export default ConfirmModal;
