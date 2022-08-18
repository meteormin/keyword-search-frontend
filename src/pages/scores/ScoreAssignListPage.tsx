import React, { useEffect, useState } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import { lang } from '../../helpers';
import DataAssign from '../../components/tasks/DataAssign';
import searchModule from '../../store/features/search';
import Timer from '../../components/common/Timer';
import DataSearch from '../../components/tasks/DataSearch';
import SearchAndReset from '../../components/common/SearchAndReset';
import LimitFilter from '../../components/common/LimitFilter';
import DynamicTable from '../../components/common/DaynamicTable';
import Pagination from '../../components/common/Pagination';
import SendQuestion from '../../components/questions/SendQuestion';
import { QuestionDiv } from '../../utils/nia15/interfaces/questions';
import { useDispatch, useSelector } from 'react-redux';
import scoreModule from '../../store/features/Scores';
import { ScoreListRecord, ScoreListSchema } from './Schemas';

const ScoreAssignListPage = () => {
  const dispatch = useDispatch();
  const { parameters } = useSelector(searchModule.getSearchState);
  const { assignList, selectAssign, time } = useSelector(
    scoreModule.getScoreState,
  );
  const [limit, setLimit] = useState<number>(100);
  const [page, setPage] = useState<number>(1);
  const [records, setRecords] = useState<ScoreListRecord[]>([]);

  const onSearch = () => {};
  const resetSearchData = () => {};
	const handleClickRecord = () => {};

  useEffect(() => {
    dispatch(scoreModule.actions.getList);
  }, []);

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
                  {lang.assign.assignedMessage}
                </span>
              ) : null}
            </Col>
          </Row>
        </Col>
      </Row>
      <Row className="ms-2 mt-2">
        <Col lg={8}>
          {/*<DataAssign*/}
          {/*  onAssign={(selectedName: string | undefined) => {*/}
          {/*    dispatch(*/}
          {/*      searchModule.actions.search({*/}
          {/*        domain: selectedName,*/}
          {/*      }),*/}
          {/*    );*/}
          {/*    dispatch(taskModule.actions.assign());*/}
          {/*  }}*/}
          {/*/>*/}
        </Col>
        <Col lg={4}>
          <Timer time={time || '00:00:00'} className="float-end w-50" />
        </Col>
      </Row>
      <Row className="ms-2">
        <Col lg={8} className="mt-4">
          <DataSearch
            onChange={(state) => {
              dispatch(
                searchModule.actions.search({
                  sentenceId: state.refId,
                  concept: state.concept,
                }),
              );
            }}
            defaultState={{
              refId: (parameters?.sentenceId as number) || undefined,
              concept: parameters?.concept as string,
            }}
          />
        </Col>
        <Col className="mt-4">
          <SearchAndReset onSearch={onSearch} onReset={resetSearchData} />
        </Col>
      </Row>
      <Row className="mt-2">
        <hr />
      </Row>
      <Row className="mt-4">
        <Col md={6} className="mt-2"></Col>
        <Col md={6}>
          <Row>
            <Col lg={6}></Col>
            <Col lg={6}>
              <LimitFilter
                selectedValue={limit}
                onChange={(e) => {
                  const option = e.target.options[e.target.selectedIndex];
                  setLimit(parseInt(option.value));
                }}
              />
            </Col>
          </Row>
        </Col>
      </Row>
      <Row className={'mt-4'}>
        <DynamicTable
          schema={ScoreListSchema}
          records={records}
          onClick={handleClickRecord}
        />
      </Row>
      <Row className="mt-5 align-content-center">
        <Col lg={4}></Col>
        <Pagination
          currentPage={page}
          totalCount={totalCount}
          limit={limit}
          onClick={(page) => {
            setPage(page);
          }}
        />
        <Col lg={4} className="mt-5">
          <SendQuestion isReply={false} div={QuestionDiv.CREATE} />
        </Col>
      </Row>
      {/*	score form */}
    </Container>
  );
};

export default ScoreAssignListPage;
