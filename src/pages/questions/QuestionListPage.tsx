import React, { useEffect, useState } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import Select from '../../components/common/Select';
import Pagination from '../../components/common/Pagination';
import DynamicTable from '../../components/common/DaynamicTable';
import { QuestionRecord, QuestionSchema } from './QuestionSchema';
import { useDispatch, useSelector } from 'react-redux';
import questionModule from '../../store/features/questions';
import QuestionForm, {
  QuestionFormData,
  QuestionFormProps,
} from '../../components/questions/QuestionForm';
import { QuestionDiv } from '../../utils/nia15/interfaces/questions';
import LimitFilter from '../../components/common/LimitFilter';
import alertModal from '../../store/features/common/alertModal';
import SendQuestion from '../../components/questions/SendQuestion';
import { getQuestionDiv, toFormData, toRecord } from './utils';

const filterOptions = [
  {
    name: '전체',
    value: -1,
  },
  {
    name: '답변완료',
    value: 1,
  },
  {
    name: '미답변',
    value: 0,
  },
];

const QuestionListPage = () => {
  const dispatch = useDispatch();
  const [filter, setFilter] = useState<number>(-1);
  const [limit, setLimit] = useState<number>(10);
  const [page, setPage] = useState<number>(1);
  const [totalPage, setTotalPage] = useState<number>(0);
  const [records, setRecords] = useState<QuestionRecord[]>([]);
  const { edit, list, search, count } = useSelector(
    questionModule.getQuestionState,
  );
  const [formData, setFormData] = useState<QuestionFormData | null>(null);
  const [formProps, setFormProps] = useState<QuestionFormProps>({
    isReply: false,
    method: 'create',
    div: QuestionDiv.CREATE,
    show: false,
    onSubmit: () => null,
    onHide: () => null,
  });
  const [div, setDiv] = useState<QuestionDiv>(QuestionDiv.CREATE);

  useEffect(() => {
    const getDiv = getQuestionDiv();
    if (getDiv) {
      setDiv(getDiv);
    }
  }, []);

  useEffect(() => {
    dispatch(questionModule.actions.isAdmin(false));
    if (filter != -1) {
      dispatch(
        questionModule.actions.search({
          isReplied: !!filter,
          limit: limit,
          page: page,
        }),
      );
    }
    dispatch(questionModule.actions.getList());
  }, [limit, page, filter]);

  useEffect(() => {
    setRecords(recordList());
    setTotalPage(Math.ceil(count / limit));
  }, [list]);

  useEffect(() => {
    if (edit != null) {
      setFormData(toFormData(edit));

      setFormProps({
        method: 'edit',
        isReply: false,
        div: edit.div,
        show: !!edit,
        onHide: onHide,
        onSubmit: onSubmit,
      });
    }

    setFormProps({
      method: 'edit',
      isReply: false,
      div: QuestionDiv.CREATE,
      show: !!edit,
      onHide: onHide,
      onSubmit: onSubmit,
    });
  }, [edit]);

  const recordList = () => {
    return list.map(toRecord);
  };

  const onClickRecord = (r: QuestionRecord) => {
    dispatch(questionModule.actions.getById(r._origin.id));
  };

  const onHide = () => dispatch(questionModule.actions.setEdit(null));

  const onSubmit = (data: QuestionFormData) => {
    if (data.id && data.reply) {
      dispatch(
        questionModule.actions.create({
          title: data.title,
          content: data.content,
          type: data.type,
          document: data.file,
          div: data.div,
        }),
      );
    } else {
      dispatch(
        alertModal.showAlert({
          title: '답변 하기',
          message: '답변내용이 없습니다.',
        }),
      );
    }
  };

  return (
    <Container>
      <Row>
        <Col lg={6}></Col>
        <Col lg={6}>
          <Row className={'mt-4'}>
            <Col lg={6}>
              <Select
                options={filterOptions}
                selectedValue={filter}
                onChange={(e) => {
                  const option = e.target.options[e.target.selectedIndex];
                  setFilter(parseInt(option.value));
                }}
                id="filter"
                name="filter"
              />
            </Col>
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
          schema={QuestionSchema}
          records={records}
          onClick={onClickRecord}
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
          <SendQuestion div={div} isReply={false} />
        </Col>
      </Row>
      <QuestionForm {...formProps} defaultData={formData} />
    </Container>
  );
};

export default QuestionListPage;
