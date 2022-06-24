import React, { Fragment, useEffect, useState } from 'react';
import { Button, Col, Row } from 'react-bootstrap';
import Search from '../../components/statistics/Search';
import statsModule from '../../store/features/statistics';
import { useDispatch, useSelector } from 'react-redux';
import { config } from '../../helpers';
import {
  Review1StatsSchema,
  Review1StatsRecord,
  Review2StatsRecord,
  toRecord1,
  setFirstRow1,
  toRecord2,
  setFirstRow2,
  Review2StatsSchema,
} from './ReviewStatsSchema';
import searchModule from '../../store/features/search';
import fileDownload from 'js-file-download';
import LimitFilter from '../../components/common/LimitFilter';
import DynamicTable from '../../components/common/DaynamicTable';
import Pagination from '../../components/common/Pagination';
import { Reviewer1, Reviewer2 } from '../../utils/nia15/interfaces/statics';

const ReviewStatList = ({ seq }: { seq: number }) => {
  const dispatch = useDispatch();
  const [limit, setLimit] = useState<number>(100);
  const [page, setPage] = useState<number>(1);
  const [records, setRecords] = useState<
    Review1StatsRecord[] | Review2StatsRecord[]
  >([]);
  const { statsReviewer, excelFile } = useSelector(statsModule.getStatsState);

  useEffect(() => {
    if (seq == 1) {
      if (statsReviewer.statistic) {
        const data = statsReviewer.statistic.map((value, index) =>
          toRecord1(value as Reviewer1, index),
        );
        setRecords(setFirstRow1(data));
      }
    }

    if (seq == 2) {
      if (statsReviewer.statistic) {
        const data = statsReviewer.statistic.map((value, index) =>
          toRecord2(value as Reviewer2, index),
        );
        setRecords(setFirstRow2(data));
      }
    }
  }, [statsReviewer]);

  useEffect(() => {
    dispatch(
      searchModule.actions.searchForStats({
        page: page,
        limit: limit,
      }),
    );
    dispatch(statsModule.actions.getReviewerStats(seq));
  }, [page, limit]);

  useEffect(() => {
    if (excelFile) {
      fileDownload(excelFile, 'reviewer_statistics.xlsx');
    }
  }, [excelFile]);

  return (
    <Fragment>
      <Row className="mx-2">
        <Search
          onSearch={() => dispatch(statsModule.actions.getReviewerStats(seq))}
          selectOptions={config.selectOptions.ReviewerSearchOptions}
        />
      </Row>
      <Row className="mx-2 mt-4">
        <hr />
      </Row>
      <Row className="mt-4 mx-2">
        <Col md={6} className="mt-2"></Col>
        <Col md={6}>
          <Row>
            <Col lg={6}></Col>
            <Col lg={6}>
              <LimitFilter
                selectedValue={limit}
                onChange={(lim) => {
                  const val =
                    lim.target.options[lim.target.selectedIndex].value;
                  setLimit(parseInt(val) || 100);
                }}
              />
            </Col>
          </Row>
        </Col>
      </Row>
      <Row className={'mt-4'}>
        <DynamicTable
          schema={seq == 1 ? Review1StatsSchema : Review2StatsSchema}
          records={records}
        />
      </Row>
      <Row className={'mt-2 mx-2'}>
        <Col md={4} className={'mt-5'}>
          <Button
            variant={'dark'}
            onClick={() => {
              dispatch(statsModule.actions.downloadReviewer(seq));
            }}
          >
            엑셀 다운로드
          </Button>
        </Col>
        <Pagination
          currentPage={page}
          totalCount={statsReviewer.count}
          limit={limit}
          onClick={(page) => {
            setPage(page);
          }}
        />
        <Col md={4}></Col>
      </Row>
    </Fragment>
  );
};
export default ReviewStatList;
