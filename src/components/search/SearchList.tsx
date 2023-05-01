import DynamicTable from 'components/common/DaynamicTable';
import React, { useEffect, useState } from 'react';
import { SearchTableSchema, schema } from 'components/search/schema';
import Card from 'components/common/Card';
import { useDispatcher } from 'components/search/utils';
import { useHostState } from 'store/features/hosts';
import { Button, Col, Form, Row } from 'react-bootstrap';
import SearchModal, { Action } from './SearchModal';
import { FormSearch } from 'components/search/SearchForm';
import { GetSearchParam } from 'api/clients/Hosts';
import PreviewModal from 'components/search/PreviewModal';
import { useSearchState } from 'store/features/search';
import SearchFilter from './SearchFilter';
import SearchCardList from './SearchCardList';

export interface SearchListProps {
    hostId: number;
}

const SearchList = ({ hostId }: SearchListProps) => {
    const dispatcher = useDispatcher();
    const { previewImage, selectId } = useSearchState();
    const [records, setRecords] = useState<SearchTableSchema[]>([]);
    const [show, setShow] = useState<boolean>(false);
    const [action, setAction] = useState<Action>('create');
    const [formData, setFormData] = useState<FormSearch | null>(null);
    const { search, page } = useHostState();
    const [searchParams, setSearchParams] = useState<GetSearchParam>({
        page: 1,
        pageSize: 20,
    });
    const [previewUrl, setPreviewUrl] = useState<string | null>(null);
    const [isImgView, setIsImgView] = useState<boolean>(false);

    useEffect(() => {
        setSearchParams((prev) => ({
            ...prev,
            page: page.page,
            pageSize: page.pageSize,
        }));
    }, [hostId, page.page, page.pageSize]);

    useEffect(() => {
        setMapRecords();
    }, [search, search?.totalCount]);

    useEffect(() => {
        dispatcher.getList(hostId, searchParams);
    }, [searchParams]);

    useEffect(() => {
        if (previewUrl == null) {
            dispatcher.setPreviewImage(null);
        }
    }, [previewUrl]);

    const UpdateButton = (hostId: number, data: FormSearch) => {
        return (
            <Button
                variant={'success'}
                onClick={() => {
                    setFormData(data);
                    setAction('update');
                    setShow(true);
                }}
            >
                Update
            </Button>
        );
    };

    const handleClickCreate = () => {
        setFormData({ hostId: hostId });
        setAction('create');
        setShow(true);
    };

    const handleEnterRow = (record: SearchTableSchema) => {
        console.log(record.id);
        dispatcher.getImage(record.id);
        setPreviewUrl(record.shortUrl);
    };

    const mapSearchTable = () => {
        return search?.data.map((s): SearchTableSchema => {
            return {
                createdAt: s.createdAt,
                updatedAt: s.updatedAt,
                shortUrl: s.shortUrl,
                id: s.id,
                publish: (
                    <Form.Check type="switch" disabled checked={s.publish} />
                ),
                description: s.description,
                query: s.query,
                queryKey: s.queryKey,
                views: s.views,
                update: UpdateButton(s.hostId, s),
                origin: s,
            };
        });
    };

    const setMapRecords = () => {
        const mapped = mapSearchTable();
        if (search?.data && mapped) {
            setRecords(mapped);
        }
    };

    const refactorSchema = Object.assign({}, schema);

    for (const [key, value] of Object.entries(refactorSchema)) {
        if (key != 'update') {
            refactorSchema[key] = Object.assign(
                {
                    onClick: handleEnterRow,
                },
                value,
            );
        }
    }

    const handleSearchFilterChange = (state: GetSearchParam) => {
        setSearchParams((prev) => ({
            ...prev,
            ...state,
        }));
    };

    const handleUpdateClick = (form: FormSearch) => {
        setFormData(form);
        setAction('update');
        setShow(true);
    };

    return (
        <>
            <Card header={`Host: ${hostId} Search`}>
                <SearchFilter onChange={handleSearchFilterChange} />
                <Row className="mt-4 ms-2 mb-2">
                    <Form.Check
                        type="switch"
                        label="Image"
                        checked={isImgView}
                        onChange={(e) => setIsImgView(e.target.checked)}
                    />
                </Row>
                {isImgView ? (
                    <SearchCardList
                        list={search?.data || []}
                        onUpdate={handleUpdateClick}
                    />
                ) : (
                    <DynamicTable schema={refactorSchema} records={records} />
                )}
                <Row className="mt-4">
                    <Col>
                        <Button
                            className="float-end me-3"
                            onClick={handleClickCreate}
                        >
                            Create
                        </Button>
                    </Col>
                </Row>
            </Card>
            {show && action ? (
                <SearchModal
                    show={show}
                    action={action}
                    data={formData}
                    onHide={() => setShow(false)}
                />
            ) : null}
            <PreviewModal
                id={selectId}
                show={!!previewUrl}
                onHide={() => setPreviewUrl(null)}
                blobUrl={previewImage?.url || ''}
                filename={previewImage?.filename || ''}
                shortUrl={previewUrl || ''}
            />
        </>
    );
};

export default SearchList;
