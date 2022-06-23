import React, { Fragment, useState } from 'react';
import { Col, Row } from 'react-bootstrap';
import SelectFilter from '../common/SelectFilter';
import { config, date } from '../../helpers';
import { useDispatch, useSelector } from 'react-redux';
import searchModule from '../../store/features/search';
import { StatsSearchParameter } from '../../utils/nia15/interfaces/search';
import Input from '../common/Input';
import SearchAndReset from '../common/SearchAndReset';
import InputFilter from '../common/InputFilter';
import DateFilter from '../common/DateFilter';
import { Option } from '../common/Select';

const DataSearch = ({
  onSearch,
  selectOptions,
}: {
  onSearch: () => any;
  selectOptions: Option[];
}) => {
  const dispatch = useDispatch();
  const [selectName, setName] = useState<string | undefined>();
  const [searchValue, setValue] = useState<string | undefined>();
  const [groupName, setGroupName] = useState<string | undefined>();
  const [assignStatus, setAssignStatus] = useState();
  const [sentenceStatus, setSentenceStatus] = useState();
  const { statsParameter } = useSelector(searchModule.getSearchState);

  const setSearchParameters = (params: StatsSearchParameter) => {
    const newParameter = { ...statsParameter, ...params };
    dispatch(searchModule.actions.searchForStats(newParameter));
  };

  const onReset = () => {
    dispatch(searchModule.actions.searchForStats(null));
  };

  return (
    <Fragment>
      <Row className="mx-2 mt-4">
        <Col md={4}>
          <SelectFilter
            label="검색어"
            onChange={(selectedValue) => {
              if (selectedValue) {
                setName(selectedValue);
              }
            }}
            options={selectOptions}
            value={selectName}
          />
        </Col>
        <Col md={4}>
          <Input
            type={'text'}
            id={'searchValue'}
            name={'searchValue'}
            value={searchValue}
            onChange={(e) => {
              if (e.target.value) {
                const value = e.target.value;
                setValue(value);
                if (selectName) {
                  const param: StatsSearchParameter = {};
                  switch (selectName) {
                    case 'creatorID':
                      param.userID = value;
                      break;
                    case 'creatorName':
                      param.name = value;
                      break;
                    case 'reviewerID':
                      param.userID = value;
                      break;
                    case 'reviewerName':
                      param.name = value;
                      break;
                    case 'domain':
                      param.domain = value;
                      break;
                    case 'concept':
                      param.concept = value;
                      break;
                    case 'taskDataID':
                    case 'refID':
                      param.refID = parseInt(value);
                      break;
                  }
                  setSearchParameters(param);
                }
              }
            }}
          />
        </Col>
        <Col md={4}>
          <SearchAndReset onSearch={onSearch} onReset={onReset} />
        </Col>
      </Row>
      <Row className="mx-2 mt-4">
        <Col md={4}>
          <InputFilter
            label={'그룹명'}
            onChange={(value) => {
              setGroupName(value);
              setSearchParameters({ groupName: value });
            }}
            value={groupName}
            placeholder="검색어를 입력해주세요."
          />
        </Col>
        <Col md={4}>
          <SelectFilter
            label={'할당현황'}
            onChange={(selectedValue) => {
              setAssignStatus(selectedValue);
              // setSearchParameters({
              // });
            }}
            options={config.selectOptions.AssignStatusOptions}
            value={assignStatus}
          />
        </Col>
        <Col md={4}>
          <SelectFilter
            label={'현재상태'}
            onChange={(selectedValue) => {
              setSentenceStatus(selectedValue);
              // setSearchParameters({});
            }}
            options={config.selectOptions.AssignStatusOptions}
            value={sentenceStatus}
          />
        </Col>
      </Row>
      <Row className="mx-2 mt-4">
        <Col md={6}>
          <DateFilter
            label={'제출일자별 조회'}
            onChange={(state) => {
              if (state.start && state.end) {
                setSearchParameters({
                  createdAtStart: date(state.start).format(),
                  createdAtEnd: date(state.end).format(),
                });
              }
            }}
          />
        </Col>
        <Col md={6}>
          <DateFilter
            label={'검수일자별 조회'}
            onChange={(state) => {
              if (state.start && state.end) {
                setSearchParameters({
                  reviewedAtStart: date(state.start).format(),
                  reviewedAtEnd: date(state.end).format(),
                });
              }
            }}
          />
        </Col>
      </Row>
    </Fragment>
  );
};

export default DataSearch;
