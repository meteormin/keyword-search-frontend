import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import DataAssign from '../../components/tasks/DataAssign';
import { useDispatch, useSelector } from 'react-redux';
import DataSearch from '../../components/tasks/DataSearch';
import Select from '../../components/common/Select';
import DynamicTable from '../../components/common/DaynamicTable';
import Pagination from '../../components/common/Pagination';
import assignListSchema from './AssignListSchema';
import { date, str } from '../../helpers';
import ReviewForm from '../../components/reviews/ReivewForm';
import reviewModule from '../../store/features/reviews';
import searchModule from '../../store/features/search';

const AssignListPage = ({ seq }: { seq: number }) => {
  const dispatch = useDispatch();
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(1);
  const [totalPage, setTotalPage] = useState(1);
  const { sentences, totalCount, time, assignSentence } = useSelector(
    reviewModule.getReviewState,
  );

  const { parameters } = useSelector(searchModule.getSearchState);

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

  const sentenceRecord = () => {
    return sentences.map((s, i) => {
      return {
        no: i + 1,
        refId: s.edges?.task.refId,
        concepts: str.limit(
          s.edges?.task?.edges?.concepts
            ?.map((c, i) => (i < 6 ? c.stem : ''))
            .join(', ') || '',
          50,
        ),
        posLength: s.edges?.task.posLength,
        sentenceCount:
          s.edges?.sentence1.sentenceCount +
          '/' +
          s.edges?.sentence2.sentenceCount,
        createdBy: s.edges?.user.loginId,
        createdAt: date(s.createAt).format('YYYY.MM.DD'),
        _origin: s,
      };
    });
  };

  const handleClickRecord = (record: any) => {
    dispatch(
      reviewModule.actions.getAssign({
        seq: seq,
        assignId: record._origin.id,
      }),
    );
  };

  useEffect(() => {
    dispatch(
      reviewModule.actions.getAssignList({
        seq: seq,
        limit: limit,
        page: page,
      }),
    );
  }, []);

  useEffect(() => {
    setTotalPage(Math.ceil(totalCount / limit));
  }, [totalCount]);

  return (
    <Container>
      <Row className="mt-2 ms-2">
        <Col lg={12}>
          <Row className="mx-2">
            <Col md={4} className=""></Col>
            <Col md={4} className=""></Col>
            <Col md={4} className="text-end">
              {time ? (
                <span className="text-danger">
                  3시간 마다 생성 데이터가 재 할당 됩니다.
                </span>
              ) : null}
            </Col>
          </Row>
        </Col>
      </Row>
      <Row className="ms-2 mt-2">
        <Col lg={12}>
          <DataAssign
            onAssign={() => {
              dispatch(reviewModule.actions.assign(seq));
            }}
            time={time?.toString() || '03:00:00'}
          />
        </Col>
      </Row>
      <Row className="ms-2">
        <Col lg={12} className="mt-4">
          <DataSearch
            onSearch={() => {
              dispatch(
                reviewModule.actions.getAssignList({
                  seq: seq,
                  limit: limit,
                  page: page,
                }),
              );
            }}
            onReset={() => null}
          />
        </Col>
      </Row>
      <Row className="mt-2">
        <hr />
      </Row>
      <Row className="mt-4">
        <Col md={6} className="mt-2"></Col>
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
        <DynamicTable
          schema={assignListSchema}
          records={sentenceRecord()}
          onClick={handleClickRecord}
        />
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
        <Col lg={4} className="mt-5">
          <Button variant="dark" className="float-end mt-1">
            <i className="fa-solid fa-paper-plane"></i>&nbsp; 문의사항 보내기
          </Button>
        </Col>
      </Row>
      <ReviewForm
        seq={seq}
        show={!!assignSentence}
        time={time?.toString() || '03:00:00'}
        onCreate={() =>
          dispatch(
            reviewModule.actions.getAssignList({
              seq: seq,
              limit: limit,
              page: page,
            }),
          )
        }
      />
    </Container>
  );
};

export default AssignListPage;
