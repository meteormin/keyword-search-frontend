import React, { useEffect, useState } from 'react';
import { Button, Image, Modal } from 'react-bootstrap';
import { decodeUnicode } from 'utils/common/str';
import { openWindows } from 'components/search/utils';
import { handleImageError } from 'helpers';

export interface PreviewModalProps {
    id: number | null;
    shortUrl: string;
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
                <Modal.Title>
                    {props.id + ': '}
                    {decodeUnicode(props.filename) || '이미지 없음'}
                </Modal.Title>
            </Modal.Header>
            <Modal.Body style={{ textAlign: 'center' }}>
                <Image
                    src={props.blobUrl}
                    width="100%"
                    onError={(e) =>
                        handleImageError(e, { width: 500, height: 500 })
                    }
                />
            </Modal.Body>
            <Modal.Footer>
                <Button
                    className="w-100"
                    variant="primary"
                    onClick={() => openWindows(props.shortUrl)}
                >
                    이동
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default PreviewModal;
