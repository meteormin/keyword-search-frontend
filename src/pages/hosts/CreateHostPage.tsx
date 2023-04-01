import React, { useEffect, useState } from 'react';
import { Button, Col, Container, Row } from 'react-bootstrap';
import { useHostDispatch, useHostState } from 'store/features/hosts';
import {
    useAlertModalDispatch,
    useAlertModalState,
} from 'store/features/common/alertModal';
import HostForm, { FormHost } from 'components/hosts/HostForm';
import { useNavigate } from 'react-router-dom';

const CreateHostPage = () => {
    const { create } = useHostDispatch();
    const { showAlert } = useAlertModalDispatch();
    const navigate = useNavigate();
    const [formData, setFormData] = useState<FormHost | null>(null);
    const { select } = useHostState();
    const { show } = useAlertModalState();
    const handleChange = (host: FormHost | null) => {
        setFormData(host);
    };

    const validateCreate = (data: FormHost): boolean => {
        if (data.host == undefined || data.host == '') {
            return false;
        } else if (data.path == undefined || data.path == '') {
            return false;
        } else if (data.description == undefined || data.description == '') {
            return false;
        } else if (data.publish == undefined) {
            return false;
        } else return !(data.subject == undefined || data.subject == '');
    };

    const handleCreate = () => {
        if (formData && validateCreate(formData)) {
            create({
                host: formData?.host || '',
                path: formData?.path || '',
                description: formData?.description || '',
                publish: formData?.publish || false,
                subject: formData?.subject || '',
            });

            return;
        }

        showAlert('유효성 검사 실패', '빈 칸이 존재합니다.');
    };

    useEffect(() => {
        if (select && !show) {
            navigate(`/hosts/${select.id}`);
        }
    }, [select, show]);

    return (
        <Container className="mt-4">
            <Row>
                <Col>
                    <HostForm host={formData} onChange={handleChange} />
                    <hr />
                </Col>
            </Row>
            <Row>
                <Col>
                    <Button
                        variant="primary"
                        className="float-end w-100"
                        onClick={handleCreate}
                    >
                        Create
                    </Button>
                </Col>
            </Row>
        </Container>
    );
};

export default CreateHostPage;
