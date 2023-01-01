import React, { useEffect, useState } from 'react';
import HostCard from 'components/hosts/HostCard';
import { useDispatch, useSelector } from 'react-redux';
import { Host } from 'api/interfaces/Hosts';
import hostStore from 'store/features/hosts';
import { Col, Container, Row } from 'react-bootstrap';
import Pagination from '../../components/common/Pagination';

function HostListPage() {
  const dispatch = useDispatch();
  const { list, page } = useSelector(hostStore.getState);
  const [rows, setRows] = useState<Host[][]>([]);
  const [pageNumber, setPageNumber] = useState<number>(page.page);
  const [pageSize, setPageSize] = useState<number>(page.pageSize);

  const getList = () => {
    dispatch(
      hostStore.actions.getList({
        page: {
          page: pageNumber,
          pageSize: pageSize,
        },
      }),
    );
  };

  const makeMatrix = (data: Host[]) => {
    const rList: Host[][] = [];
    if (data.length <= 3) {
      rList.push(data);
      return rList;
    }

    data.forEach((host, i) => {
      const cList: Host[] = [];
      cList.push(host);
      if (i % 3 === 0) {
        rList.push(cList);
      }
    });

    return rList;
  };

  const handlePagination = (pn: number) => {
    setPageNumber(pn);
  };

  useEffect(() => {
    getList();
  }, [pageNumber, pageSize]);

  useEffect(() => {
    setRows(makeMatrix(list?.data || []));
  }, [list?.totalCount]);

  return (
    <Container className="mt-4">
      {rows.map((hs, k) => {
        return (
          <Row key={k}>
            {hs.map((h, i) => {
              return (
                <Col key={i}>
                  <HostCard host={h} readOnly />
                </Col>
              );
            })}
          </Row>
        );
      })}
      <Pagination
        currentPage={pageNumber}
        totalCount={list?.totalCount || 0}
        limit={pageSize}
        onClick={handlePagination}
      />
    </Container>
  );
}

export default HostListPage;
