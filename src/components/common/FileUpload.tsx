import React, { ChangeEvent, Fragment, useState } from 'react';
import { Form } from 'react-bootstrap';
import ReactSelect from 'react-select';

export interface FilUploadProps {
    readOnly: boolean;
    accept: string;
    onChange: (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => any;
}

/**
 * @deprecated
 * @param props
 * @constructor
 */
const FileUpload = (props: FilUploadProps) => {
    const [filename, setFilename] = useState('');
    const [file, setFile] = useState<File | null>(null);

    return (
        <Fragment>
            <Form.Control
                style={{ display: 'hidden' }}
                type="file"
                readOnly={props.readOnly}
                disabled={props.readOnly}
                accept={props.accept}
                onChange={props.onChange}
            />
            <ReactSelect
                closeMenuOnSelect={false}
                hideSelectedOptions={true}
                value={filename}
                isDisabled={props.readOnly}
                placeholder={'선택된 파일 없음'}
            />
        </Fragment>
    );
};

export default FileUpload;
