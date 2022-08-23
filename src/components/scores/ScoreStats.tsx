import React, { useEffect, useState } from 'react';
import { Badge, Col, Row } from 'react-bootstrap';

export interface ScoreStats {
  total: number; // 총 평가 문장 수(누적)
  pass: number; // 현재 승인 수
  reject: number; // 현재 반려 수
  wait: number; // 검수 대기 수
  hold: number; // 검수 보류 수
  deleted: number; // 작업 불가 수(삭제된)
  rejectAcc: number; // 누적 반려 수
}

const ScoreStats = (props: ScoreStats) => {
  const [total, setTotal] = useState<number>(0);
  const [pass, setPass] = useState<number>(0);
  const [reject, setReject] = useState<number>(0);
  const [wait, setWait] = useState<number>(0);
  const [hold, setHold] = useState<number>(0);
  const [deleted, setDeleted] = useState<number>(0);
  const [rejectAcc, setRejectAcc] = useState<number>(0);

  useEffect(() => {
    setTotal(props.total);
    setPass(props.pass);
    setReject(props.reject);
    setWait(props.wait);
    setHold(props.hold);
    setDeleted(props.deleted);
    setRejectAcc(props.rejectAcc);
  }, []);

  return (
    <Row className="justify-content-center">
      <Col>
        <Badge
          bg={'light'}
          style={{ color: 'black', fontSize: '1rem', padding: '0.5rem' }}
          className="w-100"
        >
          총 평가 문장 수<br />
          {total}
        </Badge>
      </Col>
      <Col>
        <Badge
          bg={'light'}
          style={{ color: 'black', fontSize: '1rem', padding: '0.5rem' }}
          className="w-100"
        >
          승인 문장 수<br />
          {pass}
        </Badge>
      </Col>
      <Col>
        <Badge
          bg={'light'}
          style={{ color: 'black', fontSize: '1rem', padding: '0.5rem' }}
          className="w-100"
        >
          반려 문장 수<br />
          {reject}
        </Badge>
      </Col>
      <Col>
        <Badge
          bg={'light'}
          style={{ color: 'black', fontSize: '1rem', padding: '0.5rem' }}
          className="w-100"
        >
          검수 대기 문장 수<br />
          {wait}
        </Badge>
      </Col>
      <Col>
        <Badge
          bg={'light'}
          style={{ color: 'black', fontSize: '1rem', padding: '0.5rem' }}
          className="w-100"
        >
          보류 문장 수<br />
          {hold}
        </Badge>
      </Col>
      <Col>
        <Badge
          bg={'light'}
          style={{ color: 'black', fontSize: '1rem', padding: '0.5rem' }}
          className="w-100"
        >
          재작업 불가 문장 수<br />
          {deleted}
        </Badge>
      </Col>
      <Col>
        <Badge
          bg={'light'}
          style={{ color: 'black', fontSize: '1rem', padding: '0.5rem' }}
          className="w-100"
        >
          반려 누적 수<br />
          {rejectAcc}
        </Badge>
      </Col>
    </Row>
  );
};

export default ScoreStats;
