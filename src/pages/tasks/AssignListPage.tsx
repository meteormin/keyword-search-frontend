import React, { useEffect, useState } from 'react';
import DataAssign from '../../components/tasks/DataAssign';
import DataSearch from '../../components/tasks/DataSearch';
import Select from '../../components/common/Select';
import DynamicTable from '../../components/common/DaynamicTable';
import Pagination from '../../components/common/Pagination';
import { Col, Container, Row } from 'react-bootstrap';
import CreateForm from '../../components/tasks/CreateForm';
import { useDispatch, useSelector } from 'react-redux';
import taskModule from '../../store/features/tasks';
import { lang, str } from '../../helpers';
import searchModule from '../../store/features/search';
import { TaskListSchema, TaskRecord } from './TaskListSchema';
import SendQuestion from '../../components/questions/SendQuestion';
import { QuestionDiv } from '../../utils/nia15/interfaces/questions';
import Timer from '../../components/common/Timer';
import LimitFilter from '../../components/common/LimitFilter';
import SearchAndReset from '../../components/common/SearchAndReset';

const AssignListPage = () => {
  const dispatch = useDispatch();
  const [limit, setLimit] = useState(100);
  const [page, setPage] = useState(1);
  const { taskList, time, workTask, totalCount } = useSelector(
    taskModule.getTaskState,
  );
  const { parameters } = useSelector(searchModule.getSearchState);

  const taskSchema = TaskListSchema;

  const taskRecords = () => {
    return taskList.map((t, i): TaskRecord => {
      console.log('t', t.edges?.concepts);
      return {
        no: i + 1,
        id: t.refId,
        conceptSet: str.limitArray(
          t.edges?.concepts?.map((c): string => c.stem) || [''],
          6,
        ),
        wordCount: t.posLength,
        _origin: t,
      };
    });
  };

  const handleClickRecord = (record: TaskRecord) => {
    dispatch(taskModule.actions.getWorkTask(record._origin.id));
  };

  useEffect(() => {
    setInterval(() => dispatch(taskModule.actions.getExpiredAt()), 1000);
  }, []);

  useEffect(() => {
    dispatch(
      searchModule.actions.search({
        page: page,
        limit: limit,
      }),
    );
    dispatch(taskModule.actions.getTaskList());
  }, [page, limit]);

  useEffect(() => {
    taskRecords();
  }, [taskList]);

  const onSearch = () => {
    dispatch(taskModule.actions.getTaskList());
  };

  const resetSearchData = () => {
    dispatch(searchModule.actions.search(null));
  };

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
          <DataAssign
            onAssign={(selectedName: string | undefined) => {
              dispatch(
                searchModule.actions.search({
                  domain: selectedName,
                }),
              );
              dispatch(taskModule.actions.assign());
            }}
          />
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
                  refID: state.refId,
                  domain: state.domain,
                  concept: state.concept,
                }),
              );
            }}
            defaultState={{
              refId: parameters?.refID,
              domain: parameters?.domain,
              concept: parameters?.concept,
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
          schema={taskSchema}
          records={taskRecords()}
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
      <CreateForm
        show={!!workTask}
        time={time || '03:00:00'}
        onCreate={() => dispatch(taskModule.actions.getTaskList())}
      />
    </Container>
  );
};
export default AssignListPage;
