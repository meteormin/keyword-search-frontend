import React, { Fragment, useEffect, useState } from 'react';
import { Pagination as Pages } from 'react-bootstrap';

export interface PaginationProps {
  currentPage: number;
  totalPage: number;
  onClick: (page: number) => any;
}

const Pagination = (props: PaginationProps) => {
  const [page, setPage] = useState(props.currentPage);
  useEffect(() => {
    console.log(page);
  }, [page]);

  const items = () => {
    const items = [];
    for (let i = 1; i <= props.totalPage; i++) {
      if (i === props.currentPage) {
        items.push(
          <Pages.Item active onClick={() => onClick(i)}>
            {i}
          </Pages.Item>,
        );
      } else {
        items.push(<Pages.Item onClick={() => onClick(i)}>{i}</Pages.Item>);
      }
    }

    return items;
  };

  const onClick = (pageNum: number) => {
    setPage(pageNum);
    props.onClick(pageNum);
  };

  return (
    <Fragment>
      <div className="col-lg-4 offset-1">
        <div className="mx-4 mt-5">
          <Pages>
            <Pages.First className="text-dark" onClick={() => onClick(1)} />
            <Pages.Prev
              className="text-dark"
              onClick={() => {
                if (props.currentPage <= 1) {
                  return;
                }
                onClick(props.currentPage - 1);
              }}
            />
            {items()}
            <Pages.Next className="text-dark" />
            <Pages.Last
              className="text-dark"
              onClick={() => {
                if (props.totalPage <= props.currentPage) {
                  return;
                }

                onClick(props.totalPage);
              }}
            />
          </Pages>
        </div>
      </div>
    </Fragment>
  );
};

export default Pagination;
