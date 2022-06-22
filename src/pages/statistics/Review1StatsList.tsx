import React, { Fragment, useEffect, useState } from 'react';
import { Button, Col, Row } from 'react-bootstrap';
import Search from '../../components/statics/Search';
import statsModule from '../../store/features/statistics';
import { useDispatch, useSelector } from 'react-redux';
import { config } from '../../helpers';
import {
  Review1StatsSchema,
  Review1StatsRecord,
  toRecord,
} from './Review1StatsSchema';
import searchModule from '../../store/features/search';
import fileDownload from 'js-file-download';
import LimitFilter from '../../components/common/LimitFilter';
import DynamicTable from '../../components/common/DaynamicTable';
import Pagination from '../../components/common/Pagination';

const Review1StatList = () => {
  const dispatch = useDispatch();
  const [limit, setLimit] = useState<number>(100);
  const [page, setPage] = useState<number>(1);
  const [records, setRecords] = useState<Review1StatsRecord[]>([]);
  const { statsReviewer, excelFile } = useSelector(statsModule.getStatsState);
  const { statsParameter } = useSelector(searchModule.getSearchState);

  useEffect(() => {
    const data = statsReviewer.statistic.map(toRecord);
    const firstRow: Review1StatsRecord = {
      no: '',
      reviewerId: '전체',
      reviewerName: '전체',
      totalReviewed: 0,
      review1Hold: 0,
      review1Pass: 0,
      review1RejectAcc: 0,
      review2RejectAcc: 0,
      review2Pass: 0,
    };

    data.forEach((item) => {
      firstRow.totalReviewed += item.totalReviewed;
      firstRow.review1Hold += item.review1Hold;
      firstRow.review1Pass += item.review1Pass;
      firstRow.review1RejectAcc += item.review1RejectAcc;
      firstRow.review2RejectAcc += item.review2RejectAcc;
      firstRow.review2Pass += item.review2Pass;
    });

    data.unshift(firstRow);
    setRecords(data);
  }, [statsReviewer]);

  useEffect(() => {
    dispatch(
      searchModule.actions.searchForStats({
        page: page,
        limit: limit,
      }),
    );
    dispatch(statsModule.actions.getReviewerStats());
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
          onSearch={() => dispatch(statsModule.actions.getReviewerStats())}
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
        <DynamicTable schema={Review1StatsSchema} records={records} />
      </Row>
      <Row className={'mt-2 mx-2'}>
        <Col md={4} className={'mt-5'}>
          <Button
            variant={'dark'}
            onClick={() => {
              dispatch(statsModule.actions.downloadReviewer());
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
export default Review1StatList;
