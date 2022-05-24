import React, { useEffect, useState } from 'react';
import DynamicTable, {
  DynamicSchema,
} from '../../components/common/DaynamicTable';
import { SentenceListSchema, SentenceRecord } from './SentenceListSchema';
import { Button, Col, Container, Row } from 'react-bootstrap';
import Search, { SearchStats } from '../../components/sentences/Search';
import Pagination from '../../components/common/Pagination';
import Select from '../../components/common/Select';
import { useDispatch, useSelector } from 'react-redux';
import sentenceModule from '../../store/features/sentence';
import { CreateState } from '../../store/features/sentence/sentenceAction';
import { date, str } from '../../helpers';
import CreateForm from '../../components/tasks/CreateForm';

const SentenceListPage = () => {
  const dispatch = useDispatch();
  const [page, setPage] = useState(1);
  const [totalPage, setTotalPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const { sentenceHistory, editSentence, time, totalCount } = useSelector(
    sentenceModule.getSentenceState,
  );

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

  const schema: DynamicSchema = SentenceListSchema;
  const tempStats: SearchStats = {
    all: 100,
    wait: 100,
    first: 100,
    second: 100,
    rejectFirst: 100,
    rejectSecond: 100,
  };

  const records = (): SentenceRecord[] => {
    return sentenceHistory.map((s, i) => {
      let reviewAt: string | null = s.review2At || s.review1At || null;
      if (reviewAt) {
        reviewAt = date(reviewAt).format('YYYY.MM.DD');
      }
      return {
        no: i + 1,
        refId: s.refId,
        concepts: str.limit(s.concepts.map((c) => c.stem).join(', '), 20),
        posLength: s.posLength,
        sentenceState: s?.createState || '',
        createdAt: date(s.createdAt).format('YYYY.MM.DD'),
        reviewState: s?.reviewRsTxt || '',
        rejectReason: s.reviewReasons
          ? s.reviewReasons.map((reason) => reason.toString()).join(', ')
          : '',
        reviewAt: reviewAt || '',
        _origin: s,
      };
    });
  };

  const handleClickRecord = (record: SentenceRecord) => {
    if (record) {
      if (record._origin.createState != CreateState.COMPLETE) {
        dispatch(sentenceModule.actions.getSentence(record._origin.id));
      }
    }
  };

  useEffect(() => {
    dispatch(
      sentenceModule.actions.getSentenceList({ limit: limit, page: page }),
    );
  }, []);

  useEffect(() => {
    setTotalPage(totalCount);
  }, [totalCount]);

  return (
    <Container>
      <Row className="mx-1 mt-4">
        <Search
          stats={tempStats}
          onSearch={() => {
            dispatch(
              sentenceModule.actions.getSentenceList({
                limit: limit,
                page: page,
              }),
            );
          }}
        />
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
      <Row className="mt-2">
        <DynamicTable
          schema={schema}
          records={records()}
          onClick={handleClickRecord}
        />
      </Row>
      <Row className="mt-5 align-content-center">
        <Col lg={4} className="mt-5">
          <Button variant="dark" className="float-start mt-1">
            선택 다운로드
          </Button>
        </Col>
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
      <CreateForm
        show={!!editSentence}
        onCreate={() => null}
        time={time?.toString() || '--:--:--'}
      />
    </Container>
  );
};

export default SentenceListPage;
