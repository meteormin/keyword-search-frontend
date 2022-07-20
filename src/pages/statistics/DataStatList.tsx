import React, { Fragment, useEffect, useState } from 'react';
import { Button, Col, Row } from 'react-bootstrap';
import LimitFilter from '../../components/common/LimitFilter';
import DynamicTable, {
  DynamicSchema,
} from '../../components/common/DaynamicTable';
import { DataStatsRecord, DataStatsSchema, toRecord } from './DataStatsSchema';
import { useDispatch, useSelector } from 'react-redux';
import statsModule from '../../store/features/statistics';
import DataSearch from '../../components/statistics/DataSearch';
import searchModule from '../../store/features/search';
import Pagination from '../../components/common/Pagination';
import fileDownload from 'js-file-download';
import { config } from '../../helpers';
import ConfirmModal from '../../components/modals/ConfirmModal';
import { Task } from '../../utils/nia15/interfaces/statics';
import taskModule from '../../store/features/tasks';
import TaskInfoModal from '../../components/statistics/TaskInfoModal';

const DataStatList = () => {
  const dispatch = useDispatch();
  const [limit, setLimit] = useState<number>(100);
  const [page, setPage] = useState<number>(1);
  const [records, setRecords] = useState<DataStatsRecord[]>([]);
  const [confirmShow, setConfirmShow] = useState<boolean>(false);
  const [recordToTrash, setRecordToTrash] = useState<Task[]>([]);
  const { workTask } = useSelector(taskModule.getTaskState);
  const { statsTask, excelFile, jsonFile } = useSelector(
    statsModule.getStatsState,
  );

  const handleClickRecord = (record: DataStatsRecord) => {
    dispatch(taskModule.actions.getWorkTask(record._origin.id));
  };

  const setSchema = (schema: DynamicSchema) => {
    for (const [key, value] of Object.entries(schema)) {
      if (key !== 'trashBtn') {
        schema[key] = Object.assign({ onClick: handleClickRecord }, value);
      }
    }

    return schema;
  };

  useEffect(() => {
    if (statsTask.task) {
      setRecords(
        statsTask.task.map((t, i) => {
          const record = toRecord(t, i);
          record.trashBtn = (
            <a
              onClick={(e) => {
                e.preventDefault();
                setConfirmShow(true);
                const willTrash = recordToTrash;
                willTrash.push(record._origin);
                setRecordToTrash(willTrash);
              }}
            >
              <i className="fas fa-trash" style={{ cursor: 'pointer' }}></i>
            </a>
          );
          return record;
        }),
      );
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
      fileDownload(excelFile.data, excelFile.filename);
    }

    if (jsonFile) {
      fileDownload(jsonFile.data, jsonFile.filename);
    }
  }, [excelFile, jsonFile]);

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
        <DynamicTable schema={setSchema(DataStatsSchema)} records={records} />
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
        <Col md={4} className={'mt-5'}>
          <Row>
            <Col></Col>
            <Col lg={4}>
              <Button
                variant={'dark'}
                className={'w-100'}
                onClick={() => {
                  dispatch(statsModule.actions.downloadJson());
                }}
              >
                결과물다운로드
              </Button>
            </Col>
          </Row>
        </Col>
      </Row>
      <ConfirmModal
        title="삭제"
        message="정말로 삭제하시겠습까?"
        show={confirmShow}
        confirmText="삭제"
        onConfirm={() => {
          // req api
          console.log(recordToTrash[0]);
          recordToTrash.forEach((t) => {
            dispatch(statsModule.actions.deleteTask(t.id));
          });

          setRecordToTrash([]);
          setConfirmShow(false);
        }}
        onClose={() => setConfirmShow(false)}
      />
      <TaskInfoModal
        concepts={
          workTask?.edges?.concepts?.map((t) => t.stem).join(', ') || ''
        }
        basicSentence={workTask?.sentence || ''}
        show={!!workTask}
        onHide={() => {
          dispatch(taskModule.actions.setWorkTask(null));
        }}
      />
    </Fragment>
  );
};

export default DataStatList;
