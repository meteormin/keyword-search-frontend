import React, { Fragment, useEffect, useState } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import DataAssign from '../../components/tasks/DataAssign';
import { useDispatch, useSelector } from 'react-redux';
import DataSearch from '../../components/tasks/DataSearch';
import Select from '../../components/common/Select';
import DynamicTable from '../../components/common/DaynamicTable';
import Pagination from '../../components/common/Pagination';
import assignListSchema from './AssignListSchema';
import { date, lang, str } from '../../helpers';
import ReviewForm from '../../components/reviews/ReivewForm';
import reviewModule from '../../store/features/reviews';
import searchModule from '../../store/features/search';
import SendQuestion from '../../components/questions/SendQuestion';
import { QuestionDiv } from '../../utils/nia15/interfaces/questions';
import IdSearch from '../../components/reviews/IdSearch';
import DateSearch from '../../components/reviews/DateSearch';
import { SearchParameter } from '../../utils/nia15/interfaces/search';
import SearchAndReset from '../../components/common/SearchAndReset';
import Timer from '../../components/common/Timer';
import LimitFilter from '../../components/common/LimitFilter';

const AssignListPage = ({ seq }: { seq: number }) => {
  const dispatch = useDispatch();
  const [limit, setLimit] = useState(100);
  const [page, setPage] = useState(1);
  const { sentences, totalCount, time, assignSentence } = useSelector(
    reviewModule.getReviewState,
  );

  const { parameters } = useSelector(searchModule.getSearchState);

  const sentenceRecord = () => {
    return sentences.map((s, i) => {
      return {
        no: i + 1,
        refId: s.edges?.task.refId,
        concepts: str.limitArray(
          s.edges?.task?.edges?.concepts?.map((c): string => c.stem) || [''],
          6,
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

  const setSearchParameter = (state: SearchParameter) => {
    const newParameter = { ...parameters, ...state };
    dispatch(searchModule.actions.search(newParameter));
  };

  const resetSearchData = () => {
    dispatch(searchModule.actions.search(null));
  };

  const makeSearch = () => {
    return (
      <Fragment>
        <Row>
          <Col md={8}>
            <DataSearch
              onChange={(state) => {
                setSearchParameter({
                  refID: state.refId,
                  domain: state.domain,
                });
              }}
              defaultState={{
                refId: parameters?.refID,
                domain: parameters?.domain,
                concept: parameters?.concept,
              }}
            />
          </Col>
        </Row>
        <Row className="mt-4">
          <Col md={8}>
            <IdSearch
              onChange={(state) => {
                console.log('Id search', state);
                setSearchParameter(state);
              }}
            />
          </Col>
        </Row>

        <Row className="mt-4">
          <Col md={8}>
            <DateSearch
              createAtFilter={true}
              reviewAtFilter={false}
              onChange={(state) => {
                const dateParameters: SearchParameter = {};
                if (state.startCreatedAt && state.endCreatedAt) {
                  dateParameters.createdAtStart = date(
                    state.startCreatedAt,
                  ).format();
                  dateParameters.createdAtEnd = date(state.endCreatedAt)
                    .add(1, 'days')
                    .format();
                }

                if (state.startReviewAt && state.endReviewAt) {
                  dateParameters.reviewedAtStart = date(
                    state.startReviewAt,
                  ).format();
                  dateParameters.reviewedAtEnd = date(state.endReviewAt)
                    .add(1, 'days')
                    .format();
                }

                setSearchParameter(dateParameters);
              }}
            />
          </Col>
          <Col md={4}>
            <SearchAndReset
              onSearch={() =>
                dispatch(
                  reviewModule.actions.getAssignList({
                    seq: seq,
                  }),
                )
              }
              onReset={() => resetSearchData()}
            />
          </Col>
        </Row>
      </Fragment>
    );
  };

  useEffect(() => {
    setInterval(
      () => dispatch(reviewModule.actions.getExpiredAt({ seq: seq })),
      1000,
    );
  }, []);

  useEffect(() => {
    dispatch(
      searchModule.actions.search({
        page: page,
        limit: limit,
      }),
    );
    dispatch(
      reviewModule.actions.getAssignList({
        seq: seq,
      }),
    );
  }, [page, limit]);

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
              dispatch(reviewModule.actions.assign(seq));
            }}
          />
        </Col>
        <Col md={4}>
          <Timer time={time || '00:00:00'} className="float-end w-50" />
        </Col>
      </Row>
      <Row className="ms-2">
        <Col lg={12} className="mt-4">
          {makeSearch()}
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
          schema={assignListSchema}
          records={sentenceRecord()}
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
          <SendQuestion isReply={false} div={QuestionDiv.REVIEW} />
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
            }),
          )
        }
      />
    </Container>
  );
};

export default AssignListPage;
