import React from 'react';
import { Modal, Button } from 'react-bootstrap';
import alertModalModule, {
    useAlertModalDispatch,
    useAlertModalState,
} from 'store/features/common/alertModal';

const AlertModal = () => {
    const { title, message, show, refresh } = useAlertModalState();
    const { closeAlert } = useAlertModalDispatch();
    const handleClose = () => {
        closeAlert();
        if (refresh) {
            window.location.reload();
        }
    };

    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>{title}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <samp
                    style={{
                        wordBreak: 'break-all',
                        overflow: 'hidden',
                        whiteSpace: 'pre-wrap',
                        fontFamily: 'var(--bs-font-sans-serif)',
                    }}
                >
                    {message}
                </samp>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    닫기
                </Button>
                {/*<Button variant="primary" onClick={handleClose}>*/}
                {/*  Save Changes*/}
                {/*</Button>*/}
            </Modal.Footer>
        </Modal>
    );
};

export default AlertModal;
