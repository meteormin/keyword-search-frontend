import React, { Fragment, useEffect, useState } from 'react';
import { Button, Col, Row } from 'react-bootstrap';
import Search from '../../components/statics/Search';
import statsModule from '../../store/features/statistics';
import { useDispatch, useSelector } from 'react-redux';
import { config } from '../../helpers';
import {
  CreatorStatsRecord,
  CreatorStatsSchema,
  toRecord,
} from './CreatorStatsSchema';
import searchModule from '../../store/features/search';
import fileDownload from 'js-file-download';
import LimitFilter from '../../components/common/LimitFilter';
import DynamicTable from '../../components/common/DaynamicTable';
import Pagination from '../../components/common/Pagination';

const CreatorStatList = () => {
  const dispatch = useDispatch();
  const [limit, setLimit] = useState<number>(100);
  const [page, setPage] = useState<number>(1);
  const [records, setRecords] = useState<CreatorStatsRecord[]>([]);
  const { statsCreator, excelFile } = useSelector(statsModule.getStatsState);
  const { statsParameter } = useSelector(searchModule.getSearchState);

  useEffect(() => {
    const data = statsCreator.statistic.map(toRecord);
    const firstRow: CreatorStatsRecord = {
      no: '',
      creatorId: '전체',
      creatorName: '전체',
      totalCreated: 0,
      temp: 0,
      wait: 0,
      reWait: 0,
      hold1: 0,
      review1Pass: 0,
      review1Reject: 0,
      review2Reject: 0,
      review1RejectAcc: 0,
      review2RejectAcc: 0,
      review2Pass: 0,
    };

    data.forEach((item) => {
      firstRow.totalCreated += item.totalCreated;
      firstRow.temp += item.temp;
      firstRow.wait += item.wait;
      firstRow.reWait += item.reWait;
      firstRow.hold1 += item.hold1;
      firstRow.review1Pass += item.review1Pass;
      firstRow.review1Reject += item.review1Reject;
      firstRow.review2Reject += item.review2Reject;
      firstRow.review1RejectAcc += item.review1RejectAcc;
      firstRow.review2RejectAcc += item.review2RejectAcc;
      firstRow.review2Pass += item.review2Pass;
    });

    data.unshift(firstRow);
    setRecords(data);
  }, [statsCreator]);

  useEffect(() => {
    dispatch(
      searchModule.actions.searchForStats({
        page: page,
        limit: limit,
      }),
    );
    dispatch(statsModule.actions.getCreatorStats());
  }, [page, limit]);

  useEffect(() => {
    if (excelFile) {
      fileDownload(excelFile, 'creator_statistics.xlsx');
    }
  }, [excelFile]);

  return (
    <Fragment>
      <Row className="mx-2">
        <Search
          onSearch={() => dispatch(statsModule.actions.getCreatorStats())}
          selectOptions={config.selectOptions.CreatorSearchOptions}
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
        <DynamicTable schema={CreatorStatsSchema} records={records} />
      </Row>
      <Row className={'mt-2 mx-2'}>
        <Col md={4} className={'mt-5'}>
          <Button
            variant={'dark'}
            onClick={() => {
              dispatch(statsModule.actions.downloadCreator());
            }}
          >
            엑셀 다운로드
          </Button>
        </Col>
        <Pagination
          currentPage={page}
          totalCount={statsCreator.count}
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
export default CreatorStatList;
