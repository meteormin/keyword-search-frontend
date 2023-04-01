import { Col, Row } from 'react-bootstrap';
import SelectFilter from '../common/SelectFilter';
import Input from '../common/Input';
import SearchAndReset from '../common/SearchAndReset';
import React, { useEffect, useState } from 'react';
import { GetSearchParam } from '../../api/clients/Hosts';
import { Option } from '../common/Select';

const searchOptions: Option[] = [
    { name: '검색기준', value: '' },
    { name: 'QueryKey', value: 'queryKey' },
    { name: 'Query', value: 'query' },
];

const sortOptions: Option[] = [
    { name: '정렬기준', value: '' },
    { name: '최신순', value: 'recent' },
    { name: '조회순', value: 'views' },
];

export interface SearchFilterProps {
    onChange: (state: GetSearchParam) => void;
}

const SearchFilter = (props: SearchFilterProps) => {
    const [searchParams, setSearchParams] = useState<GetSearchParam>({
        page: 1,
        pageSize: 20,
    });
    const [select, setSelect] = useState<string>('');
    const [queryString, setQueryString] = useState<string>('');
    const [sort, setSort] = useState<string>('');

    const handleQueryKeyChange = (selectedValue: string) => {
        setSelect(selectedValue);
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setQueryString(e.target.value);
    };

    const handleSearch = () => {
        console.log(select, queryString);
        if (select && queryString) {
            let queryKey: string | undefined = undefined;
            let query: string | undefined = undefined;
            switch (select) {
                case 'queryKey':
                    queryKey = queryString;
                    break;
                case 'query':
                    query = queryString;
                    break;
            }

            setSearchParams((prev) => ({
                ...prev,
                queryKey: queryKey,
                query: query,
                page: 1,
                pageSize: 20,
            }));
        } else {
            setSearchParams((prev) => ({
                ...prev,
                queryKey: undefined,
                query: undefined,
                page: 1,
                pageSize: 20,
            }));
        }
    };

    const handleReset = () => {
        setSelect('');
        setQueryString('');
    };

    const handleChangeSort = (selectedValue: string) => {
        let sortBy: string | undefined = undefined;
        let orderBy: string | undefined = undefined;

        setSort(selectedValue);
        switch (selectedValue) {
            case 'recent':
                sortBy = 'created_at';
                orderBy = 'desc';
                break;
            case 'views':
                sortBy = 'views';
                orderBy = 'desc';
                break;
            default:
                break;
        }

        setSearchParams((prev) => ({
            ...prev,
            sortBy,
            orderBy,
        }));
    };

    useEffect(() => {
        props.onChange(searchParams);
    }, [searchParams]);

    return (
        <>
            <Row className="mt-2 mb-4">
                <Col md="3">
                    <SelectFilter
                        label="Key"
                        onChange={handleQueryKeyChange}
                        options={searchOptions}
                        value={select}
                    />
                </Col>
                <Col md="6">
                    <Input
                        type="text"
                        id="queryString"
                        name="queryString"
                        value={queryString}
                        onChange={handleInputChange}
                    />
                </Col>
                <Col>
                    <SearchAndReset
                        onSearch={handleSearch}
                        onReset={handleReset}
                    />
                </Col>
            </Row>
            <Row className="mt-2 mb-4">
                <Col md="3">
                    <SelectFilter
                        label="sort"
                        onChange={handleChangeSort}
                        options={sortOptions}
                        value={sort}
                    />
                </Col>
            </Row>
        </>
    );
};

export default SearchFilter;
