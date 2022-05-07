import React, { Fragment, useState } from 'react';
import { Modal, Button } from 'react-bootstrap';

export interface ConfirmModalProps {
  buttonText: string;
  title: string;
  message: string;
  confirmText: string;
  onConfirm: () => any;
}

const ConfirmModal = ({
  buttonText,
  title,
  message,
  confirmText,
  onConfirm,
}: ConfirmModalProps) => {
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

export default ConfirmModal;
