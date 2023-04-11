import Card from 'components/common/Card';
import { Button, Col, Row, Image } from 'react-bootstrap';
import React, { useEffect, useState } from 'react';
import { Search } from 'api/interfaces/Search';
import { openWindows } from 'components/search/utils';
import { handleImageError } from 'helpers';

export interface SearchCardProps {
    search: Search;
    getImage: (id: number) => Promise<{
        filename: string;
        url: string;
    }>;
}

const SearchCard = ({ search, getImage }: SearchCardProps) => {
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

    return (
        <Card
            header={
                <Row>
                    <Col>{search.id + ': ' + search.description}</Col>
                    <Col>{imageInfo.filename}</Col>
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
