import React, { useEffect, useState } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import DataSearch from '../../components/scores/DataSearch';
import searchModule from '../../store/features/search';
import SearchAndReset from '../../components/common/SearchAndReset';
import { useDispatch, useSelector } from 'react-redux';
import scoreModule from '../../store/features/scores';
import SelectFilter from '../../components/common/SelectFilter';
import { config, date } from '../../helpers';
import LimitFilter from '../../components/common/LimitFilter';
import DateFilter from '../../components/common/DateFilter';
import ScoreStats from '../../components/scores/ScoreStats';
import DynamicTable from '../../components/common/DaynamicTable';
import { toScoreRecord, ScoreListRecord, ScoreListSchema } from './Schemas';
import Pagination from '../../components/common/Pagination';
import SendQuestion from '../../components/questions/SendQuestion';
import { QuestionDiv } from '../../utils/nia153/interfaces/question';
import { Search } from '../../utils/nia153/interfaces/search';

const ScoreListPage = () => {
  const dispatch = useDispatch();
  const { parameters } = useSelector(searchModule.getSearchState);
  const { scoreList } = useSelector(scoreModule.getScoreState);
  const [reviewStatus, setReviewStatus] = useState<string | null>(null);
  const [rejectReason, setRejectReason] = useState<number | null>(null);
  const [limit, setLimit] = useState<number>(100);
  const [page, setPage] = useState<number>(1);
  const [totalCount, setTotalCount] = useState<number>(0);
  const [records, setRecords] = useState<ScoreListRecord[]>([]);

  const onSearch = () => {
    dispatch(scoreModule.actions.getList());
  };

  const resetSearchData = () => {
    dispatch(searchModule.actions.search(null));
  };

  const setSearchParameter = (params: Search) => {
    dispatch(searchModule.actions.search(params));
  };

  useEffect(() => {
    if (scoreList.data) {
      setTotalCount(scoreList.count);
      setRecords(scoreList.data.map(toScoreRecord));
    }
  }, [scoreList.data]);

  useEffect(() => {
    dispatch(
      searchModule.actions.search({
        page: page,
        limit: limit,
      }),
    );
    dispatch(scoreModule.actions.getList());
  }, [page, limit]);

  return (
    <Container>
      <Row className="mt-2 ms-2">
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
      <Row className="ms-2 mt-2">
        <Col lg={8} className="mt-4">
          <Row className="mx-2">
            <Col md={4}>
              <SelectFilter
                label={'검수 상태'}
                onChange={(selectedValue) =>
                  setSearchParameter({
                    reviewState: selectedValue as string,
                  })
                }
                options={config.selectOptions.ReviewState}
                value={reviewStatus || ''}
              />
            </Col>
            <Col md={4} className="ms-1">
              <SelectFilter
                label={'반려 사유'}
                onChange={(selectedValue) =>
                  setSearchParameter({
                    rejectReason: selectedValue as number,
                  })
                }
                options={config.selectOptions.RejectReason}
                value={rejectReason || ''}
              />
            </Col>
          </Row>
        </Col>
        <Col></Col>
      </Row>
      <Row className="ms-4 mt-4">
        <Col lg={4} className="mx-2">
          <DateFilter
            label={'평가 일자'}
            onChange={(state) => {
              if (state.start && state.end) {
                setSearchParameter({
                  scoredAtStart: date(state.start).format('YYYY-MM-DD'),
                  scoredAtEnd: date(state.end).format('YYYY-MM-DD'),
                });
              }
            }}
          />
        </Col>
        <Col lg={4} className="mx-2">
          <DateFilter
            label={'검수 일자'}
            onChange={(state) => {
              if (state.start && state.end) {
                setSearchParameter({
                  reviewAtStart: date(state.start).format('YYYY-MM-DD'),
                  reviewAtEnd: date(state.end).format('YYYY-MM-DD'),
                });
              }
            }}
          />
        </Col>
      </Row>
      <Row className="ms-2 mt-4">
        <Col lg={1}></Col>
        <Col>
          <ScoreStats
            total={0}
            pass={0}
            reject={0}
            wait={0}
            hold={0}
            deleted={0}
            rejectAcc={0}
          />
        </Col>
        <Col lg={1}></Col>
      </Row>

      <Row className="mt-4">
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
        <DynamicTable schema={ScoreListSchema} records={records} />
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
    </Container>
  );
};

export default ScoreListPage;
