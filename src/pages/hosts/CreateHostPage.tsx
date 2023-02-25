import React, { useEffect, useState } from 'react';
import { Button, Col, Container, Row } from 'react-bootstrap';
import hostStore from 'store/features/hosts';
import alertStore from 'store/features/common/alertModal';
import { useDispatch, useSelector } from 'react-redux';
import HostForm, { FormHost } from 'components/hosts/HostForm';
import { useNavigate } from 'react-router-dom';

const CreateHostPage = () => {
  const dispatch = useDispatch();
  const naviagte = useNavigate();
  const [formData, setFormData] = useState<FormHost | null>(null);
  const { select } = useSelector(hostStore.getState);
  const { show } = useSelector(alertStore.getAlertState);
  const handleChange = (host: FormHost | null) => {
    console.log(host);
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
      dispatch(
        hostStore.actions.create({
          host: formData?.host || '',
          path: formData?.path || '',
          description: formData?.description || '',
          publish: formData?.publish || false,
          subject: formData?.subject || '',
        }),
      );

      return;
    }

    dispatch(
      alertStore.showAlert({
        title: '유효성 검사 실패',
        message: '빈 칸이 존재합니다.',
      }),
    );
  };

  useEffect(() => {
    if (select && !show) {
      naviagte(`/hosts/${select.id}`);
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
