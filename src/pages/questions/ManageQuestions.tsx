import React, { useEffect, useState } from 'react';
import { Button, Col, Container, Row } from 'react-bootstrap';
import Pagination from '../../components/common/Pagination';
import DynamicTable from '../../components/common/DaynamicTable';
import { QuestionRecord, QuestionSchema } from './QuestionSchema';
import { useDispatch, useSelector } from 'react-redux';
import questionModule from '../../store/features/questions';
import QuestionForm, {
  QuestionFormData,
  QuestionFormProps,
} from '../../components/questions/QuestionForm';
import {
  QuestionDiv,
  QuestionSearch,
} from '../../utils/nia15/interfaces/questions';
import LimitFilter from '../../components/common/LimitFilter';
import Search from '../../components/questions/Search';
import { date } from '../../helpers';
import alertModal from '../../store/features/common/alertModal';

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

const ManageQuestions = () => {
  const dispatch = useDispatch();
  const [limit, setLimit] = useState<number>(10);
  const [page, setPage] = useState<number>(1);
  const [totalPage, setTotalPage] = useState<number>(0);
  const [records, setRecords] = useState<QuestionRecord[]>([]);
  const { edit, list, search, count } = useSelector(
    questionModule.getQuestionState,
  );
  const [formData, setFormData] = useState<QuestionFormData | null>(null);
  const [formProps, setFormProps] = useState<QuestionFormProps>({
    isReply: true,
    method: 'create',
    div: QuestionDiv.CREATE,
    show: false,
    onSubmit: () => null,
    onHide: () => null,
  });

  useEffect(() => {
    dispatch(questionModule.actions.isAdmin(true));
    dispatch(
      questionModule.actions.search({
        limit: limit,
        page: page,
      }),
    );
    dispatch(questionModule.actions.getList());

    setTotalPage(Math.ceil(count / limit));
  }, [limit, page]);

  useEffect(() => {
    setRecords(recordList());
  }, [list]);

  useEffect(() => {
    if (edit != null) {
      const data: QuestionFormData = {
        id: edit.id,
        type: edit.edges.questionType.id,
        title: edit.title,
        content: edit.content,
        div: edit.div,
        reply: edit.reply,
        fileName: edit.fileName,
      };

      setFormData(data);

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

  const onHide = () => dispatch(questionModule.actions.setEdit(null));

  const onSubmit = (data: QuestionFormData) => {
    console.log(data);
    if (data.id && data.reply) {
      dispatch(
        questionModule.actions.reply({
          questionId: data.id,
          content: data.reply,
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

  const recordList = () => {
    return list.map((q, i) => {
      const r: QuestionRecord = {
        no: i + 1,
        div: q.div,
        type: q.type,
        subject: q.title,
        createdAt: date(q.createdAt).format('yyyy-MM-DD'),
        creatorId: q.userLoginId,
        repliedAt: q.repliedAt
          ? date(q.repliedAt).format('yyyy-MM-DD')
          : '미답변',
        replyLoginId: q.replyUserLoginId,
        _origin: q,
      };

      return r;
    });
  };

  const onClickRecord = (r: QuestionRecord) => {
    dispatch(questionModule.actions.getById(r._origin.id));
  };

  const onSearch = (s: QuestionSearch | undefined) => {
    dispatch(questionModule.actions.getList());
  };

  return (
    <Container>
      <Row>
        <Search onSearch={onSearch} />
      </Row>
      <Row className={'mt-4'}>
        <Col lg={6}></Col>
        <Col lg={6}>
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
          <Button variant="dark" className="float-end mt-1">
            <i className="fa-solid fa-paper-plane"></i>&nbsp; 문의사항 보내기
          </Button>
        </Col>
      </Row>
      <QuestionForm {...formProps} defaultData={formData} />
    </Container>
  );
};

export default ManageQuestions;
