import React, { Fragment } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import questionModule from '../../store/features/questions';
import { QuestionSearch } from '../../utils/nia153/interfaces/question';
import SelectFilter from '../common/SelectFilter';
import { Row, Col, Button } from 'react-bootstrap';
import {
  QuestionTypeOptions,
  IsRepliedOptions,
  SearchNames,
} from './QuestionOptions';
import Input from '../common/Input';
import { useState } from 'react';
import DateFilter from '../common/DateFilter';
import { date } from '../../helpers';

export interface SearchProps {
  onSearch: (search: QuestionSearch | undefined) => any;
}

const Search = (props: SearchProps) => {
  const dispatch = useDispatch();
  const { search } = useSelector(questionModule.getQuestionState);
  const [searchName, setSearchName] = useState<string | undefined>('');
  const [searchValue, setSearchValue] = useState<string | undefined>();
  const [searchType, setSearchType] = useState<number | undefined>(0);
  const [isReplied, setIsReplied] = useState<number | undefined>(-1);
  const [start, setStart] = useState<string | undefined>();
  const [end, setEnd] = useState<string | undefined>();

  const setSearchParameter = (state: QuestionSearch) => {
    dispatch(questionModule.actions.search(state));
  };

  const resetState = () => {
    setSearchName('');
    setSearchValue(undefined);
    setSearchType(0);
    setIsReplied(-1);
    setSearchParameter({
      userId: undefined,
      title: undefined,
      isReplied: undefined,
      type: undefined,
      createdAtStart: undefined,
      createdAtEnd: undefined,
    });
  };

  return (
    <Fragment>
      <Row className={'mt-4'}>
        <Col md={4}>
          <SelectFilter
            label={'검색어'}
            value={searchName}
            onChange={(selectedValue) => {
              if (selectedValue) {
                setSearchName(selectedValue);
              }
            }}
            options={SearchNames}
          />
        </Col>
        <Col md={4}>
          <Input
            name={'searchInput'}
            id={'searchInput'}
            value={searchValue}
            onChange={(e) => {
              setSearchValue(e.target.value);
              if (e.target.value && searchName) {
                if (searchName == 'title') {
                  setSearchParameter({ title: e.target.value });
                } else if (searchName == 'userId') {
                  setSearchParameter({ userId: e.target.value });
                }
              }
            }}
            type={'text'}
          />
        </Col>
        <Col md={4}>
          <Button
            className={'w-50'}
            variant={'dark'}
            onClick={() => {
              props.onSearch(search);
            }}
          >
            검색
          </Button>

          <Button
            className={'w-50'}
            variant={'light'}
            onClick={() => {
              resetState();
            }}
          >
            초기화
          </Button>
        </Col>
      </Row>
      <Row className={'mt-4'}>
        <Col md={4}>
          <SelectFilter
            label={'문의 유형'}
            value={searchType}
            onChange={(selectedValue) => {
              if (selectedValue) {
                setSearchType(selectedValue);
                setSearchParameter({
                  type: selectedValue,
                });
              }
            }}
            options={QuestionTypeOptions}
          />
        </Col>
        <Col md={5}>
          <SelectFilter
            label={'답변 여부'}
            value={isReplied}
            onChange={(selectedValue) => {
              if (selectedValue !== undefined && selectedValue !== -1) {
                setIsReplied(selectedValue);
                setSearchParameter({
                  isReplied: !!selectedValue,
                });
              }
            }}
            options={IsRepliedOptions}
          />
        </Col>
      </Row>
      <Row className={'mt-4'}>
        <Col md={6}>
          <DateFilter
            label={'작성 일자'}
            onChange={(state) => {
              if (state) {
                if (state.start) {
                  const start = date(state.start).format();
                  setStart(start);
                  setSearchParameter({
                    createdAtStart: start,
                  });
                }

                if (state.end) {
                  const end = date(state.end).add(1, 'days').format();
                  setEnd(end);
                  setSearchParameter({
                    createdAtEnd: end,
                  });
                }
              }
            }}
          />
        </Col>
      </Row>
    </Fragment>
  );
};

export default Search;
