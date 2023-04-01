import React from 'react';
import { components, OptionProps } from 'react-select';

const CheckBoxOption = (
    props: OptionProps<{ label: string; value: string | number }>,
) => {
    return (
        <div>
            <components.Option {...props}>
                <input
                    type="checkbox"
                    checked={props.isSelected}
                    onChange={() => null}
                />{' '}
                <label>{props.label}</label>
            </components.Option>
        </div>
    );
};

export default CheckBoxOption;
