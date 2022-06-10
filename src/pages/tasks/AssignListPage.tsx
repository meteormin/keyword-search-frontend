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
import { useNavigate } from 'react-router';
import { TaskRecord } from './TaskListSchema';
import SendQuestion from '../../components/questions/SendQuestion';
import { QuestionDiv } from '../../utils/nia15/interfaces/questions';

const AssignListPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [searchValue, setValue] = useState<string>('');
  const [searchName, setName] = useState<string | number>('');
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(1);
  const [totalPage, setTotalPage] = useState(1);
  const { taskList, time, workTask, totalCount } = useSelector(
    taskModule.getTaskState,
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

  const taskSchema = {
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
    setTotalPage(Math.ceil(totalCount / limit));
  }, [totalCount]);

  useEffect(() => {
    taskRecords();
  }, [taskList]);

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
        <Col lg={12}>
          <DataAssign
            onAssign={(selectedName: string | undefined) => {
              dispatch(
                searchModule.actions.search({
                  domain: selectedName,
                }),
              );
              dispatch(taskModule.actions.assign());
            }}
            time={time || '00:00:00'}
          />
        </Col>
      </Row>
      <Row className="ms-2">
        <Col lg={12} className="mt-4">
          <DataSearch
            onSearch={(state) => {
              dispatch(
                searchModule.actions.search({
                  refID: state.refId,
                  domain: state.domain,
                  concept: state.concept,
                }),
              );
              dispatch(taskModule.actions.getTaskList());
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
          schema={taskSchema}
          records={taskRecords()}
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
          <SendQuestion
            isReply={false}
            div={QuestionDiv.CREATE}
            onSubmit={(data) => console.log(data)}
          />
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
