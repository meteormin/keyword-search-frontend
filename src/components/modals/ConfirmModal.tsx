import React, { Fragment, useState } from 'react';
import { Modal, Button } from 'react-bootstrap';

export interface ConfirmModalProps {
  title: string;
  message: string;
  confirmText: string;
  onConfirm: () => any;
}

const ConfirmModal = ({
  title,
  message,
  confirmText,
  onConfirm,
}: ConfirmModalProps) => {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);

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
          <Button variant="primary" onClick={onConfirm}>
            {confirmText}
          </Button>
        </Modal.Footer>
      </Modal>
    </Fragment>
  );
};

export default ConfirmModal;
