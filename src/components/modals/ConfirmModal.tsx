import React, { Fragment, useEffect, useState } from 'react';
import { Modal, Button } from 'react-bootstrap';

export interface ConfirmModalProps {
  title: string;
  message: string;
  show: boolean;
  confirmText: string;
  onConfirm: () => any;
  onClose: () => any;
}

const ConfirmModal = ({
  title,
  message,
  show,
  confirmText,
  onConfirm,
  onClose,
}: ConfirmModalProps) => {
  const [showState, setShow] = useState(false);

  useEffect(() => {
    setShow(show);
  }, [show]);

  const handleClose = () => {
    setShow(false);
    onClose();
  };

  const handleConfirm = () => {
    setShow(false);
    onConfirm();
  };

  return (
    <Fragment>
      <Modal show={showState} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>{title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>{message}</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            닫기
          </Button>
          <Button variant="primary" onClick={handleConfirm}>
            {confirmText}
          </Button>
        </Modal.Footer>
      </Modal>
    </Fragment>
  );
};

export default ConfirmModal;
