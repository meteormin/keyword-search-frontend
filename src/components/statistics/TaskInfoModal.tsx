import React, { useEffect, useState } from 'react';
import { Modal, Table } from 'react-bootstrap';

export interface TaskInfoModalProps {
  concepts: string;
  basicSentence: string;
  show: boolean;
  onHide: () => void;
}

const TaskInfoModal = (props: TaskInfoModalProps) => {
  const [concepts, setConcepts] = useState<string>('');
  const [basicSentence, setBasicSentence] = useState<string>('');
  const [show, setShow] = useState<boolean>(false);

  const onHide = () => {
    setShow(false);
    setConcepts('');
    setBasicSentence('');
    props.onHide();
  };

  useEffect(() => {
    setConcepts(props.concepts);
    setBasicSentence(props.basicSentence);
    setShow(props.show);
  }, [props]);

  return (
    <Modal show={show} onHide={onHide} dialogClassName={'modal-30w'} centered>
      <Modal.Header closeButton>문장정보 상세</Modal.Header>
      <Modal.Body>
        <Table bordered responsive size="sm" className={'table-light'}>
          <tbody>
            <tr>
              <th scope="col">개념집합</th>
              <td className="bg-white">{concepts}</td>
            </tr>
            <tr>
              <th scope="col">기본문장</th>
              <td className="bg-white">{basicSentence}</td>
            </tr>
          </tbody>
        </Table>
      </Modal.Body>
    </Modal>
  );
};

export default TaskInfoModal;
