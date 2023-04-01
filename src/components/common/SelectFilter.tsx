import { Col, Row } from 'react-bootstrap';
import Select, { Option } from 'components/common/Select';
import React from 'react';

export interface selectFilterProps {
    label: string;
    onChange: (selectedValue: any) => any;
    options: Option[];
    value: any;
}

const SelectFilter = (props: selectFilterProps) => {
    return (
        <Row>
            <Col md={5}>
                <label className="form-label mt-2">
                    <strong>{props.label}</strong>
                </label>
            </Col>
            <Col md={7}>
                <Select
                    id={'selectFilter'}
                    name={'selectFilter'}
                    options={props.options}
                    selectedValue={props.value}
                    onChange={(e) => {
                        const value =
                            e.target.options[e.target.selectedIndex].value;
                        props.onChange(value || '');
                    }}
                />
            </Col>
        </Row>
    );
};

export default SelectFilter;
