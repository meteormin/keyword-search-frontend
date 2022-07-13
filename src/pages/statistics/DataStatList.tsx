import React, { Fragment, useEffect, useState } from 'react';
import { Button, Col, Row } from 'react-bootstrap';
import LimitFilter from '../../components/common/LimitFilter';
import DynamicTable from '../../components/common/DaynamicTable';
import { DataStatsRecord, DataStatsSchema, toRecord } from './DataStatsSchema';
import { useDispatch, useSelector } from 'react-redux';
import statsModule from '../../store/features/statistics';
import DataSearch from '../../components/statistics/DataSearch';
import searchModule from '../../store/features/search';
import Pagination from '../../components/common/Pagination';
import fileDownload from 'js-file-download';
import { config } from '../../helpers';

const DataStatList = () => {
  const dispatch = useDispatch();
  const [limit, setLimit] = useState<number>(100);
  const [page, setPage] = useState<number>(1);
  const [records, setRecords] = useState<DataStatsRecord[]>([]);
  const { statsTask, excelFile } = useSelector(statsModule.getStatsState);

  useEffect(() => {
    if (statsTask.task) {
      setRecords(statsTask.task.map(toRecord));
    }
  }, [statsTask]);

  useEffect(() => {
    dispatch(
      searchModule.actions.searchForStats({
        page: page,
        limit: limit,
      }),
    );
    dispatch(statsModule.actions.getTaskStats());
  }, [page, limit]);

  useEffect(() => {
    if (excelFile) {
      fileDownload(excelFile, 'task_statistics.xlsx');
    }
  }, [excelFile]);

  return (
    <Fragment>
      <Row className="mx-2">
        <DataSearch
          onSearch={() => dispatch(statsModule.actions.getTaskStats())}
          selectOptions={config.selectOptions.DataStatsSearchOptions}
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
        <DynamicTable schema={DataStatsSchema} records={records} />
      </Row>
      <Row className={'mt-2 mx-2'}>
        <Col md={4} className={'mt-5'}>
          <Row>
            <Col lg={4}>
              <Button
                variant={'dark'}
                className={'w-100'}
                onClick={() => {
                  dispatch(statsModule.actions.downloadTask());
                }}
              >
                엑셀 다운로드
              </Button>
            </Col>
            <Col lg={6}>
              <Button
                variant={'dark'}
                className={'w-100'}
                onClick={() => {
                  dispatch(statsModule.actions.downloadReport());
                }}
              >
                문장 현황 다운로드
              </Button>
            </Col>
          </Row>
        </Col>
        <Pagination
          currentPage={page}
          totalCount={statsTask.count}
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

export default DataStatList;
