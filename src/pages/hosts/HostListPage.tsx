import React, { Fragment, useEffect, useState } from 'react';
import HostCard from 'components/hosts/HostCard';
import { useDispatch, useSelector } from 'react-redux';
import { Host } from 'api/interfaces/Hosts';
import hostStore from 'store/features/hosts';
import { Container } from 'react-bootstrap';

function HostListPage() {
  const dispatch = useDispatch();

  const [page, setPage] = useState<number>(1);
  const [pageSize, setPageSize] = useState<number>(10);
  const { list } = useSelector(hostStore.getState);

  const getList = () => {
    dispatch(
      hostStore.actions.getList({
        page: {
          page: page,
          pageSize: pageSize,
        },
      }),
    );
  };

  useEffect(() => {
    getList();
  }, []);

  useEffect(() => {
    getList();
  }, [page, pageSize]);

  return (
    <Fragment>
      <Container className="mt-4">
        {list?.data.map((h: Host, k) => {
          return <HostCard key={k} host={h} />;
        })}
      </Container>
    </Fragment>
  );
}

export default HostListPage;
