import React, { useEffect, useState } from 'react';
import { Pagination as Pages } from 'react-bootstrap';

export interface PaginationProps {
    currentPage: number;
    totalCount: number;
    limit: number;
    onClick: (page: number) => any;
}

const Pagination = (props: PaginationProps) => {
    const [page, setPage] = useState(props.currentPage);
    const [limit, setLimit] = useState(props.limit);
    const [totalCount, setTotalCount] = useState(props.totalCount);
    const [totalPage, setTotalPage] = useState<number>(1);
    const [items, setItems] = useState<JSX.Element[]>([]);

    useEffect(() => {
        setPage(props.currentPage);
        setLimit(props.limit);
        setTotalCount(props.totalCount);
        setTotalPage(Math.ceil(props.totalCount / props.limit) || 1);
        setItems(makeItems());
    }, [props]);

    useEffect(() => {
        setTotalPage(Math.ceil(totalCount / limit) || 1);
    }, [page, limit, totalCount]);

    useEffect(() => {
        setItems(makeItems());
    }, [totalPage]);

    const makeItems = () => {
        const pageItems = [];

        let count = 10;
        if (totalCount < 10) {
            count = 1;
        }

        let currentIndex = page % 10;

        if (currentIndex == 0) {
            currentIndex = 10;
        }

        for (let i = 1; i <= count; i++) {
            if (page + (i - currentIndex) > totalPage) {
                break;
            }

            if (i === currentIndex) {
                pageItems.push(
                    <Pages.Item
                        key={`page_${i}`}
                        active
                        onClick={() => onClick(page)}
                    >
                        {page}
                    </Pages.Item>,
                );
            } else if (i > currentIndex) {
                pageItems.push(
                    <Pages.Item
                        key={`page_${i}`}
                        onClick={() => onClick(page + (i - currentIndex))}
                    >
                        {page + (i - currentIndex)}
                    </Pages.Item>,
                );
            } else if (i < currentIndex) {
                pageItems.push(
                    <Pages.Item
                        key={`page_${i}`}
                        onClick={() => onClick(page - (currentIndex - i))}
                    >
                        {page - (currentIndex - i)}
                    </Pages.Item>,
                );
            }
        }

        return pageItems;
    };

    const onClick = (pageNum: number) => {
        setPage(pageNum);
        props.onClick(pageNum);
    };

    return (
        <div className="row">
            <div className="col-lg-4"></div>
            <div className="col-lg-4">
                <div className="mx-4 mt-5">
                    <Pages className="justify-content-center text-center">
                        <Pages.First
                            className="text-dark"
                            onClick={() => onClick(1)}
                        />
                        <Pages.Prev
                            className="text-dark"
                            onClick={() => {
                                if (props.currentPage <= 1) {
                                    return;
                                }
                                onClick(props.currentPage - 1);
                            }}
                        />
                        {items}
                        <Pages.Next
                            className="text-dark"
                            onClick={() => {
                                if (totalPage <= props.currentPage) {
                                    return;
                                }
                                onClick(props.currentPage + 1);
                            }}
                        />
                        <Pages.Last
                            className="text-dark"
                            onClick={() => {
                                onClick(totalPage);
                            }}
                        />
                    </Pages>
                </div>
            </div>
            <div className="col-lg-4"></div>
        </div>
    );
};

export default Pagination;
