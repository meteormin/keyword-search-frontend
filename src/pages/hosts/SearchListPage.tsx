import React, { useEffect, useState } from 'react';
import { Container } from 'react-bootstrap';
import SearchList from 'components/search/SearchList';
import { useHostDispatch, useHostState } from 'store/features/hosts';
import Pagination from '../../components/common/Pagination';
import { useParams } from 'react-router';

const SearchListPage = () => {
  const params = useParams();
  const hostId: number = params.id ? parseInt(params.id) : 0;
  const { setPage } = useHostDispatch();
  const { search, page } = useHostState();
  const [pageNumber, setPageNumber] = useState<number>(page.page);
  const [pageSize, setPageSize] = useState<number>(page.pageSize);

  const handlePagination = (pn: number) => {
    setPageNumber(pn);
  };

  useEffect(() => {
    setPage({ page: pageNumber, pageSize: pageSize });
  }, [pageNumber, pageSize]);

  return (
    <Container className="mt-4">
      {hostId ? <SearchList hostId={hostId} /> : null}
      <Pagination
        currentPage={pageNumber}
        totalCount={search?.totalCount || 0}
        limit={pageSize}
        onClick={handlePagination}
      />
    </Container>
  );
};

export default SearchListPage;
