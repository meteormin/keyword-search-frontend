import React, { useEffect, useState } from 'react';
import { Image, Modal } from 'react-bootstrap';
import { decodeUnicode } from '../../utils/str';

export interface PreviewModalProps {
  show?: boolean;
  onHide: () => void;
  blobUrl: string;
  filename: string;
}

const PreviewModal = (props: PreviewModalProps) => {
  const [show, setShow] = useState<boolean>(!!props.show);

  const handleClose = () => {
    setShow(false);
    props.onHide();
  };

  useEffect(() => {
    setShow(!!props.show);
  }, [props.show]);

  return (
    <Modal show={show} onHide={handleClose} centered size={'lg'}>
      <Modal.Header closeButton>
        <Modal.Title>{decodeUnicode(props.filename)}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Image src={props.blobUrl} width={720} />
      </Modal.Body>
    </Modal>
  );
};

export default PreviewModal;
