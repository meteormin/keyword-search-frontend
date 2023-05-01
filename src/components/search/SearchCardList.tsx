import React, { useEffect, useState } from 'react';
import { Search } from 'api/interfaces/Search';
import SearchCard from 'components/search/SearchCard';
import { Col, Row } from 'react-bootstrap';
import makeClient from 'api';
import SearchClient from 'api/clients/Search';
import { ApiResponse } from 'api/base/ApiClient';
import { parseAttachFileName } from 'utils/common/str';
import { auth } from 'helpers';
import { FormSearch } from './SearchForm';

const client = makeClient(SearchClient, {
    token: auth.getToken()?.accessToken.token || '',
    tokenType: auth.getToken()?.accessToken.tokenType || '',
});

export interface SearchCardListProps {
    list: Search[];
    onUpdate: (form: FormSearch) => void;
}

const getImage = async (
    id: number,
): Promise<{
    url: string;
    filename: string;
}> => {
    try {
        const res: ApiResponse = (await client.getPreviewImage(
            id,
        )) as ApiResponse;
        const url = URL.createObjectURL(res.data);
        const filename = parseAttachFileName(
            res?.headers['content-disposition'] as string,
        );
        return { url, filename };
    } catch (e) {
        console.error(e);
    }

    return { url: '', filename: '' };
};

const SearchCardList = ({ list, onUpdate }: SearchCardListProps) => {
    const [rows, setRows] = useState<Search[][]>([]);
    useEffect(() => {
        setRows(makeMatrix(list));
    }, [list]);

    const makeMatrix = (data: Search[]): Search[][] => {
        const rList: Search[][] = [];
        console.log(data);
        if (data.length <= 3) {
            rList.push(data);
            return rList;
        }

        const chunkSize = 3;
        for (let i = 0; i < data.length; i += chunkSize) {
            rList.push(data.slice(i, i + chunkSize));
        }

        return rList;
    };

    return (
        <>
            {rows.map((r, index): React.ReactElement => {
                console.log(r);
                return (
                    <Row key={index}>
                        {r.map((v, i) => {
                            return (
                                <Col key={i} lg={4}>
                                    <SearchCard
                                        search={v}
                                        getImage={getImage}
                                        onUpdate={onUpdate}
                                    />
                                </Col>
                            );
                        })}
                    </Row>
                );
            })}
        </>
    );
};

export default SearchCardList;
