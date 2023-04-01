import React, { Fragment } from 'react';
import { Button } from 'react-bootstrap';

export interface DataSearchProps {
    onSearch: () => any;
    onReset: () => any;
}

const SearchAndReset = (props: DataSearchProps) => {
    return (
        <Fragment>
            <Button
                variant="dark"
                className={'w-50'}
                onClick={() => props.onSearch()}
            >
                검색
            </Button>
            <Button
                variant="light"
                className="border w-50"
                onClick={() => props.onReset()}
            >
                초기화
            </Button>
        </Fragment>
    );
};

export default SearchAndReset;
