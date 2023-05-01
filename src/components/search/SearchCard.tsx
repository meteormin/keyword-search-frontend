import Card from 'components/common/Card';
import { Button, Col, Row, Image } from 'react-bootstrap';
import React, { useEffect, useState } from 'react';
import { Search } from 'api/interfaces/Search';
import { openWindows } from 'components/search/utils';
import { handleImageError } from 'helpers';
import { FormSearch } from './SearchForm';

export interface SearchCardProps {
    search: Search;
    getImage: (id: number) => Promise<{
        filename: string;
        url: string;
    }>;
    onUpdate: (form: FormSearch) => void;
}

const SearchCard = ({ search, getImage, onUpdate }: SearchCardProps) => {
    const [imageInfo, setImageInfo] = useState<{
        url: string;
        filename: string;
    }>({
        url: '',
        filename: '',
    });

    useEffect(() => {
        getImage(search.id).then((res) => {
            setImageInfo((prevState) => {
                return { ...prevState, ...res };
            });
        });
    }, [search.id]);

    const handleUpdateBtn = () => {
        onUpdate({
            id: search.id,
            hostId: search.hostId,
            publish: search.publish,
            query: search.query,
            queryKey: search.queryKey,
            description: search.description,
        });
    };

    return (
        <Card
            header={
                <Row>
                    <Col>{search.id + ': ' + search.description}</Col>
                    <Col>{imageInfo.filename}</Col>
                    <Col>
                        <Button onClick={handleUpdateBtn}>Update</Button>
                    </Col>
                </Row>
            }
        >
            <Row
                style={{
                    height: '200px',
                    overflow: 'scroll',
                    textAlign: 'center',
                }}
            >
                <Image
                    src={imageInfo.url}
                    width="100%"
                    height="auto"
                    onError={handleImageError}
                />
            </Row>
            <hr />
            <Row>
                <Col>
                    <Button
                        variant="primary"
                        className="float-end w-100"
                        onClick={() => openWindows(search.shortUrl)}
                    >
                        이동
                    </Button>
                </Col>
            </Row>
        </Card>
    );
};

export default SearchCard;
