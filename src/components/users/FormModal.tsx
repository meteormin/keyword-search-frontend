import React from 'react';
import { Modal } from 'react-bootstrap';

export interface CreateModalProps {
  show: boolean;
  onHide: () => any;
  children: JSX.Element[] | JSX.Element;
}

const FormModal = ({ show, onHide, children }: CreateModalProps) => {
  return (
    <Modal show={show}>
      <Modal.Header closeButton onHide={onHide}>
        사용자 등록
      </Modal.Header>
      <Modal.Body>{children}</Modal.Body>
    </Modal>
  );
};

export default FormModal;
