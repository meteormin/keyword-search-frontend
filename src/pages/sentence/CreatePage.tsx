import React, { useState } from 'react';
import DataAssign from '../../components/sentence/DataAssign';
import DataSearch from '../../components/sentence/DataSearch';
import Select from '../../components/common/Select';
import DynamicTable from '../../components/common/DaynamicTable';
import Pagination from '../../components/common/Pagination';
import { Button, Col, Container, Row } from 'react-bootstrap';

const CreatePage = () => {
  const [searchValue, setValue] = useState('');
  const [selectedName, selectName] = useState<string | number>('');
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(1);
  const [totalPage, setTotalPage] = useState(1);
  const [time, setTime] = useState('03:00:00');

  const searchNames = [
    {
      name: '개념집합',
      value: '개념집합',
    },
    {
      name: '고유번호',
      value: '고유번호',
    },
  ];
  const limitOptions = [
    {
      name: '10개씩 보기',
      value: 10,
    },
    {
      name: '50개씩 보기',
      value: 50,
    },
    {
      name: '100개씩 보기',
      value: 100,
    },
  ];

  const sentenceSchema = {
    no: {
      name: 'NO',
    },
    id: {
      name: '고유번호',
    },
    conceptSet: {
      name: '개념집합',
    },
    wordCount: {
      name: (
        <span>
          기본 문장 <br />
          단어수
        </span>
      ),
    },
  };

  return (
    <Container>
      <Row className="ms-2">
        <Col lg={12} className="mt-4">
          <DataAssign
            searchName={searchNames}
            selectedName={selectedName}
            searchValue={searchValue}
            onSearch={(selectedName: string | number, searchValue: string) => {
              setValue(searchValue);
              selectName(selectedName);
            }}
          />
        </Col>
      </Row>
      <Row className="mt-2">
        <hr />
      </Row>
      <Row>
        <Col md={4}>
          {time ? (
            <Button variant="light" className="btn bg-light border">
              진행 가능 시간
              <br />
              {time}
            </Button>
          ) : null}
        </Col>
        <DataSearch search={() => null} reset={() => null} />
      </Row>
      <Row className="mt-4">
        <Col md={6} className="mt-2">
          {time ? (
            <span className="text-danger">
              3시간 마다 생성 데이터가 재 할당 됩니다.
            </span>
          ) : null}
        </Col>
        <Col md={6}>
          <div className="float-end mb-2">
            <Select
              id="limit"
              name="limit"
              options={limitOptions}
              onChange={(e) => {
                setLimit(
                  parseInt(e.target.options[e.target.selectedIndex].value),
                );
              }}
            />
          </div>
        </Col>
      </Row>
      <Row>
        <DynamicTable schema={sentenceSchema} records={[]} />
      </Row>
      <Row className="mt-5 align-content-center">
        <Col lg={4}></Col>
        <Pagination
          currentPage={page}
          totalPage={totalPage}
          onClick={(page) => {
            setPage(page);
          }}
        />
        <Col lg={3} className="mt-5">
          <Button variant="dark" className="float-end mt-1">
            <i className="fa-solid fa-paper-plane"></i>&nbsp; 문의사항 보내기
          </Button>
        </Col>
      </Row>
    </Container>
  );
};

export default CreatePage;
