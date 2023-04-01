import React, { useEffect, useState } from 'react';
import { openWindows } from 'components/search/utils';
import SearchBar from 'components/search/SearchBar';
import { Col, Container, Form, Row } from 'react-bootstrap';
import { useHostDispatch, useHostState } from 'store/features/hosts';

const SearchPage = () => {
    const hostDispatcher = useHostDispatch();
    const { subjects, page, searchDescriptions } = useHostState();
    const [hostPageNumber, setHostPageNumber] = useState<number>(page.page);
    const [hostPageSize, setHostPageSize] = useState<number>(20);
    const [subjectsData, setSubjectsData] = useState<
        { id: number; subject: string }[]
    >([]);

    const [searchPageNumber, setSearchPageNumber] = useState<number>(page.page);
    const [searchPageSize, setSearchPageSize] = useState<number>(20);
    const [selectedId, setSelectedId] = useState<number | null>();
    const [searchData, setSearchData] = useState<
        { id: number; description: string; shortUrl: string }[]
    >([]);

    const getSubjects = () => {
        hostDispatcher.getSubjects({
            page: hostPageNumber,
            pageSize: hostPageSize,
        });
    };

    const getSearch = () => {
        if (selectedId) {
            hostDispatcher.getSearchDescriptions(selectedId, {
                page: searchPageNumber,
                pageSize: searchPageSize,
            });
        } else {
            hostDispatcher.setSearchDescriptions({
                page: 1,
                pageSize: 10,
                totalCount: 0,
                data: [],
            });
        }
    };

    const handleSubjectsPaginate = () => {
        setHostPageNumber(hostPageNumber + 1);
    };

    const handleSearchPaginate = () => {
        setSearchPageNumber(searchPageNumber + 1);
    };

    const handleSubjectsChange = (s: string[]) => {
        const fId = findHostId(s[0]);
        setSearchData([]);
        setSelectedId(fId);
    };

    const addSubjects = () => {
        const convData = subjects?.data || [];
        const temp = [...subjectsData];
        setSubjectsData(temp.concat(convData));
    };

    const findHostId = (str: string): number | null => {
        const found =
            subjectsData.filter((s) => {
                return str == s.subject;
            }) || [];

        if (found.length != 0) {
            return found[0].id || null;
        }

        return null;
    };

    const handleSearchChange = (str: string[]) => {
        const found =
            searchData.filter((s) => {
                return str[0] == s.description;
            }) || [];

        if (found.length != 0) {
            openWindows(found[0].shortUrl);
        }
    };

    const addSearchData = () => {
        console.log('add');
        const convData = searchDescriptions?.data || [];
        const temp = [...searchData];
        setSearchData(temp.concat(convData));
    };

    useEffect(() => {
        getSubjects();
    }, [hostPageSize, hostPageNumber]);

    useEffect(() => {
        getSearch();
    }, [selectedId, searchPageSize, searchPageNumber]);

    useEffect(() => {
        addSearchData();
    }, [searchDescriptions]);

    useEffect(() => {
        addSubjects();
    }, [subjects]);

    return (
        <Container>
            <Row className="mt-4 ms-4 me-4">
                <Col lg={4}>
                    <Form.Group>
                        <Form.Label>Host</Form.Label>
                        <SearchBar
                            id="hosts"
                            data={subjectsData.map((v) => v.subject)}
                            onPaginate={handleSubjectsPaginate}
                            onChange={handleSubjectsChange}
                            maxResults={hostPageSize / 2}
                        />
                    </Form.Group>
                </Col>
                <Col lg={8}>
                    <Form.Group>
                        <Form.Label>Search</Form.Label>
                        <SearchBar
                            id="search"
                            data={searchData.map((v) => v.description)}
                            onPaginate={handleSearchPaginate}
                            onChange={handleSearchChange}
                            maxResults={searchPageSize / 2}
                        />
                    </Form.Group>
                </Col>
            </Row>
        </Container>
    );
};

export default SearchPage;
