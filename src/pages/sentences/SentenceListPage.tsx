import React, { useEffect, useState } from 'react';
import DynamicTable, {
  DynamicSchema,
} from '../../components/common/DaynamicTable';
import { SentenceListSchema, SentenceRecord } from './SentenceListSchema';
import { Button, Col, Container, Row } from 'react-bootstrap';
import Search from '../../components/sentences/Search';
import Pagination from '../../components/common/Pagination';
import Select from '../../components/common/Select';
import { useDispatch, useSelector } from 'react-redux';
import sentenceModule from '../../store/features/sentence';
import { date, lang, str } from '../../helpers';
import ReworkForm from '../../components/sentences/ReworkForm';
import searchModule from '../../store/features/search';
import CreateForm from '../../components/tasks/CreateForm';
import { ReviewStatus } from '../../utils/nia15/interfaces/reviews';
import SendQuestion from '../../components/questions/SendQuestion';
import { QuestionDiv } from '../../utils/nia15/interfaces/questions';
import StatusCount from '../../components/sentences/StatusCount';
import LimitFilter from '../../components/common/LimitFilter';

const SentenceListPage = () => {
  const dispatch = useDispatch();
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(100);
  const [formSeq, setFormSeq] = useState<number>(1);
  const { sentenceHistory, editSentence, totalCount } = useSelector(
    sentenceModule.getSentenceState,
  );

  const schema: DynamicSchema = SentenceListSchema;

  const records = (): SentenceRecord[] => {
    return sentenceHistory.map((s, i) => {
      let reviewAt: string | null = s.review2At || s.review1At || null;
      if (reviewAt) {
        reviewAt = date(reviewAt).format('YYYY.MM.DD');
      }
      return {
        no: i + 1,
        refId: s.refId,
        concepts: str.limitArray(s.concepts?.map((c) => c.stem) || [''], 6),
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
      if (record._origin.createState != lang.sentence.createState.complete) {
        if (record._origin.review1At) {
          setFormSeq(1);
        }
        if (record._origin.review2At) {
          setFormSeq(2);
        }
        dispatch(sentenceModule.actions.getSentence(record._origin.id));
      }
    }
  };

  useEffect(() => {
    dispatch(
      searchModule.actions.search({
        limit: limit,
        page: page,
      }),
    );
    dispatch(sentenceModule.actions.getSentenceList());
  }, [page, limit]);

  return (
    <Container>
      <Row className="mx-1 mt-4">
        <Search
          onSearch={() => {
            dispatch(sentenceModule.actions.getSentenceList());
          }}
        />
        <StatusCount
          all={0}
          wait={0}
          first={0}
          second={0}
          rejectFirst={0}
          rejectSecond={0}
        />
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
        show={!!editSentence && editSentence.status == ReviewStatus.TEMP}
        onCreate={() => dispatch(sentenceModule.actions.getSentenceList())}
        time={'--:--:--'}
      />
      <ReworkForm
        seq={formSeq}
        show={!!editSentence && editSentence.status != ReviewStatus.TEMP}
        onCreate={() => dispatch(sentenceModule.actions.getSentenceList())}
        time={'--:--:--'}
      />
    </Container>
  );
};

export default SentenceListPage;
