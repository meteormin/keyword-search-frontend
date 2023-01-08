import React, { useEffect, useState } from 'react';
import { openWindows } from 'components/search/utils';

import SearchBar from 'components/search/SearchBar';
import { Col, Container, FormGroup, Row } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import hostStore from 'store/features/hosts';
import { Form } from 'react-bootstrap';

const SearchPage = () => {
  const dispatch = useDispatch();
  const { subjects, page, searchDescriptions } = useSelector(
    hostStore.getState,
  );
  const [hostPageNumber, setHostPageNumber] = useState<number>(page.page);
  const [hostPageSize, setHostPageSize] = useState<number>(page.pageSize);
  const [searchPageNumber, setSearchPageNumber] = useState<number>(page.page);
  const [searchPageSize, setSearchPageSize] = useState<number>(page.pageSize);
  const [selectedId, setSelectedId] = useState<number | null>();
  const getSubjects = () => {
    dispatch(
      hostStore.actions.getSubjects({
        page: {
          page: hostPageNumber,
          pageSize: hostPageSize,
        },
      }),
    );
  };

  const getSearch = () => {
    if (selectedId) {
      dispatch(
        hostStore.actions.getSearchDescriptions({
          hostId: selectedId,
          page: {
            page: hostPageNumber,
            pageSize: hostPageSize,
          },
        }),
      );
    } else {
      dispatch(
        hostStore.actions.setSearchDescriptions({
          page: 1,
          pageSize: 10,
          totalCount: 0,
          data: [],
        }),
      );
    }
  };

  const handleSubjectsPaginate = () => {
    setHostPageNumber(hostPageNumber + 1);
    setHostPageSize(hostPageSize + 1);
  };

  const handleSearchPaginate = () => {
    setSearchPageNumber(searchPageNumber + 1);
    setSearchPageSize(searchPageSize + 1);
  };

  const handleSubjectsChange = (s: string[]) => {
    const fId = findHostId(s[0]);
    setSelectedId(fId);
  };

  const findHostId = (str: string): number | null => {
    const found =
      subjects?.data.filter((s) => {
        return str == s.subject;
      }) || [];

    if (found.length != 0) {
      return found[0].id || null;
    }

    return null;
  };

  const handleSearchChange = (str: string[]) => {
    const found =
      searchDescriptions?.data.filter((s) => {
        return str[0] == s.description;
      }) || [];

    if (found.length != 0) {
      openWindows(found[0].shortUrl);
    }
  };

  useEffect(() => {
    getSubjects();
  }, [hostPageSize, hostPageNumber]);

  useEffect(() => {
    getSearch();
  }, [selectedId]);

  return (
    <Container>
      <Row className="mt-4 ms-4 me-4">
        <Col lg={4}>
          <Form.Group>
            <Form.Label>Host</Form.Label>
            <SearchBar
              id="hosts"
              data={subjects?.data.map((v) => v.subject) || []}
              onPaginate={handleSubjectsPaginate}
              onChange={handleSubjectsChange}
            />
          </Form.Group>
        </Col>
        <Col lg={8}>
          <Form.Group>
            <Form.Label>Search</Form.Label>
            <SearchBar
              id="search"
              data={searchDescriptions?.data.map((v) => v.description) || []}
              onPaginate={handleSearchPaginate}
              onChange={handleSearchChange}
            />
          </Form.Group>
        </Col>
      </Row>
    </Container>
  );
};

export default SearchPage;
