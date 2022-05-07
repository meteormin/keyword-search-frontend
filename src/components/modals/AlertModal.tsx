import React, { Fragment } from 'react';
import { Modal, Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import alertModalModule from '../../store/features/common/alertModal';

const AlertModal = () => {
  const { title, message, show } = useSelector(alertModalModule.getAlertState);
  const dispatch = useDispatch();
  const handleClose = () => dispatch(alertModalModule.closeAlert());

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

export default AlertModal;
