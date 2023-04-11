import React, { useEffect, useState } from 'react';
import { Search } from 'api/interfaces/Search';
import SearchCard from 'components/search/SearchCard';
import { Col, Row } from 'react-bootstrap';
import makeClient from 'api';
import SearchClient from 'api/clients/Search';
import { ApiResponse } from 'api/base/ApiClient';
import { parseAttachFileName } from 'utils/common/str';
import { auth } from 'helpers';

const client = makeClient(SearchClient, {
    token: auth.getToken()?.accessToken.token || '',
    tokenType: auth.getToken()?.accessToken.tokenType || '',
});

export interface SearchCardListProps {
    list: Search[];
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

const SearchCardList = ({ list }: SearchCardListProps) => {
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

        let cList: Search[] = [];
        data.forEach((s, i) => {
            cList.push(s);
            if ((i + 1) % 3 === 0) {
                rList.push(cList);
                cList = [];
            }
        });

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
