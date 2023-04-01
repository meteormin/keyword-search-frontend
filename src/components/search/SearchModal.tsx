import React, { useEffect, useState } from 'react';
import { Button, Modal } from 'react-bootstrap';
import SearchForm, { FormSearch } from './SearchForm';
import { useDispatcher } from 'components/search/utils';
import { useSearchState } from '../../store/features/search';
import { PreviewImage } from '../../store/features/search/action';

export type Action = 'create' | 'update' | 'delete';

const ActionBtn = ({
    action,
    data,
}: {
    action: Action;
    data: FormSearch | null;
}) => {
    const dispatcher = useDispatcher();
    const btnTxt = action.charAt(0).toUpperCase() + action.slice(1);
    const handleClick = () => {
        if (data == null) {
            return;
        }

        switch (action) {
            case 'create':
                return dispatcher.create(data);
            case 'update':
                return data.id ? dispatcher.patch(data.id, data) : null;
            case 'delete':
                return data.id ? dispatcher.delete(data.id) : null;
        }
    };

    return (
        <Button
            disabled={data == null}
            variant="primary"
            onClick={() => handleClick()}
        >
            {btnTxt}
        </Button>
    );
};

export interface SearchModalProps {
    show?: boolean;
    action: Action;
    data: FormSearch | null;
    onHide: () => void;
}

const SearchModal = (props: SearchModalProps) => {
    const dispatcher = useDispatcher();
    const { previewImage } = useSearchState();
    const [show, setShow] = useState<boolean>(!!props.show);
    const [action, setAction] = useState<Action>(props.action);
    const [data, setData] = useState<FormSearch | null>(props.data);

    const handleClose = () => {
        setShow(false);
        setAction('create');
        setData(null);
        props.onHide();
    };

    const handleChange = (
        search: FormSearch | null,
        file: PreviewImage | null,
    ) => {
        setData(search);
        dispatcher.setPreviewImage(file);
    };

    useEffect(() => {
        if (action != 'create') {
            if (data?.id) {
                dispatcher.getImage(data?.id);
            }
        }
    }, []);

    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Search Form</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <SearchForm
                    search={data}
                    previewImage={previewImage}
                    onChange={handleChange}
                />
            </Modal.Body>
            <Modal.Footer>
                <ActionBtn action={action} data={data} />
            </Modal.Footer>
        </Modal>
    );
};

export default SearchModal;
