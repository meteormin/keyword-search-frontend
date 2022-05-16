import React from 'react';
import { Modal } from 'react-bootstrap';

export interface CreateModalProps {
  header: string;
  show: boolean;
  onHide: () => any;
  children: JSX.Element[] | JSX.Element;
}

const FormModal = ({ header, show, onHide, children }: CreateModalProps) => {
  return (
    <Modal show={show}>
      <Modal.Header closeButton onHide={onHide}>
        {header}
      </Modal.Header>
      <Modal.Body>{children}</Modal.Body>
    </Modal>
  );
};

export default FormModal;
