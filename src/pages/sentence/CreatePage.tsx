import React, { useState } from 'react';
import DataAssign from '../../components/sentence/DataAssign';
import DataSearch from '../../components/sentence/DataSearch';
import Select from '../../components/common/Select';
import DynamicTable from '../../components/common/DaynamicTable';
import Pagination from '../../components/common/Pagination';

const CreatePage = () => {
  const [searchValue, setValue] = useState('');
  const [selectedName, selectName] = useState<string | number>('');
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(1);
  const [totalPage, setTotalPage] = useState(1);
  const [time, setTime] = useState('03:00:00');

  const searchNames = [
    {
      name: '개념집합',
      value: '개념집합',
    },
    {
      name: '고유번호',
      value: '고유번호',
    },
  ];
  const limitOptions = [
    {
      name: '10개씩 보기',
      value: 10,
    },
    {
      name: '50개씩 보기',
      value: 50,
    },
    {
      name: '100개씩 보기',
      value: 100,
    },
  ];

  const sentenceSchema = {
    no: {
      name: 'NO',
    },
    id: {
      name: '고유번호',
    },
    conceptSet: {
      name: '개념집합',
    },
    wordCount: {
      name: (
        <span>
          기본 문장 <br />
          단어수
        </span>
      ),
    },
  };

  return (
    <div className="container">
      <div className="row justify-content ms-2">
        <div className="col-lg-12 mt-4">
          <DataAssign
            searchName={searchNames}
            selectedName={selectedName}
            searchValue={searchValue}
            onSearch={(selectedName: string | number, searchValue: string) => {
              setValue(searchValue);
              selectName(selectedName);
            }}
          />
        </div>
      </div>
      <div className="row mt-2">
        <hr />
      </div>
      <div className="row">
        <div className="col-4">
          {time ? (
            <button type="button" className="btn bg-light border">
              진행 가능 시간
              <br />
              {time}
            </button>
          ) : null}
        </div>
        <DataSearch search={() => null} reset={() => null} />
      </div>
      <div className="row mt-4">
        <div className="col-6 mt-2">
          {time ? (
            <span className="text-danger">
              3시간 마다 생성 데이터가 재 할당 됩니다.
            </span>
          ) : null}
        </div>
        <div className="col-6">
          <div className="float-end mb-2">
            <Select
              id="limit"
              name="limit"
              options={limitOptions}
              onChange={(e) => {
                setLimit(
                  parseInt(e.target.options[e.target.selectedIndex].value),
                );
              }}
            />
          </div>
        </div>
      </div>
      <div className="row">
        <DynamicTable schema={sentenceSchema} records={[]} />
      </div>
      <div className="row mt-5 align-content-center">
        <div className="col-lg-4"></div>
        <Pagination
          currentPage={page}
          totalPage={totalPage}
          onClick={(page) => {
            setPage(page);
          }}
        />
        <div className="col-lg-3 mt-5">
          <button type="button" className="btn btn-dark float-end mt-1">
            <i className="fa-solid fa-paper-plane"></i>&nbsp; 문의사항 보내기
          </button>
        </div>
      </div>
    </div>
  );
};

export default CreatePage;
