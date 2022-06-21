import React, { Fragment, useEffect, useState } from 'react';
import { Button, Col, Container, Form, Row } from 'react-bootstrap';
import DataAssign from '../../components/tasks/DataAssign';
import { useDispatch, useSelector } from 'react-redux';
import DataSearch from '../../components/tasks/DataSearch';
import DynamicTable, {
  DynamicSchema,
} from '../../components/common/DaynamicTable';
import Pagination from '../../components/common/Pagination';
import assignListSchema from './AssignListSchema';
import { arr, date, lang, str } from '../../helpers';
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
import MultipleReview from '../../components/reviews/MultipleReview';
import alertModal from '../../store/features/common/alertModal';
import { Sentence } from '../../utils/nia15/interfaces/sentences';
import { sentenceToCreateReview } from './reviewDataMap';

const AssignListPage = ({ seq }: { seq: number }) => {
  const dispatch = useDispatch();
  const [limit, setLimit] = useState(100);
  const [page, setPage] = useState(1);
  const [showMR, setShowMR] = useState<boolean>(false);
  const [actionMR, setActionMR] = useState<'pass' | 'reject'>('reject');
  const [checks, setChecks] = useState<Sentence[]>([]);

  const { sentences, totalCount, time, assignSentence } = useSelector(
    reviewModule.getReviewState,
  );

  const { parameters } = useSelector(searchModule.getSearchState);

  const sentenceRecord = () => {
    return sentences.map((s, i) => {
      let checkbox = {};
      if (seq == 2) {
        checkbox = (
          <Form.Check
            type="checkbox"
            onChange={(e) => {
              if (e.target.checked) {
                const oldCh = checks;
                const newCh = checks;
                newCh.push(s);
                setChecks(arr.merge(oldCh, newCh, true));
              } else {
                setChecks(arr.remove(checks, s));
              }
            }}
          />
        );
      }

      const rs = {
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

      return Object.assign({ check: checkbox }, rs);
    });
  };

  const checkboxSchema = () => {
    let schema: DynamicSchema = assignListSchema;

    for (const [key, value] of Object.entries(schema)) {
      schema[key] = Object.assign({ onClick: handleClickRecord }, value);
    }

    if (seq == 2) {
      schema = Object.assign(
        {
          check: {
            name: (
              <Fragment>
                <span>전체</span>
                <Form.Check
                  type="checkbox"
                  onChange={(e) => {
                    // 전체 선택
                    if (e.target.checked) {
                      setChecks(sentences);
                    }
                  }}
                />
              </Fragment>
            ),
          },
        },
        assignListSchema,
      );
    }

    return schema;
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
              onChange={(params) => {
                const dateParameters: SearchParameter = {};

                dateParameters.createdAtStart = params.createAt.start;
                dateParameters.createdAtEnd = params.createAt.end;

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
          schema={checkboxSchema()}
          records={sentenceRecord()}
          // onClick={handleClickRecord}
        />
      </Row>
      <Row className="mt-5 align-content-center">
        <Col lg={4} className="mt-5">
          <Row>
            <Col lg={4}>
              <Button
                variant={'dark'}
                className="float-end"
                onClick={() => {
                  if (checks.length != 0) {
                    setActionMR('reject');
                    setShowMR(true);
                  } else {
                    dispatch(
                      alertModal.showAlert({
                        title: '선택 반려',
                        message: '선택된 문장이 없습니다.',
                      }),
                    );
                  }
                }}
              >
                선택반려
              </Button>
            </Col>
            <Col lg={8}>
              <Button
                variant={'dark'}
                onClick={() => {
                  if (checks.length != 0) {
                    setActionMR('pass');
                    setShowMR(true);
                  } else {
                    dispatch(
                      alertModal.showAlert({
                        title: '선택 승인',
                        message: '선택된 문장이 없습니다.',
                      }),
                    );
                  }
                }}
              >
                선택승인
              </Button>
            </Col>
          </Row>
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
      {seq == 2 ? (
        <MultipleReview
          action={actionMR}
          show={showMR}
          onHide={() => setShowMR(false)}
          onSubmit={(data) => {
            console.log(checks, data);
            checks.forEach((s) => {
              dispatch(
                reviewModule.actions.createReview({
                  seq: seq,
                  review: sentenceToCreateReview(s, data),
                }),
              );
            });
            setShowMR(false);
            dispatch(reviewModule.actions.getAssignList({ seq: seq }));
          }}
        />
      ) : null}
    </Container>
  );
};

export default AssignListPage;
