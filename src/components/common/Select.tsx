import React, { ChangeEvent, useEffect, useState } from 'react';

export interface SelectProps {
    id: string;
    label?: string;
    name: string;
    selectedValue?: any;
    options: Option[];
    onChange?: (e: ChangeEvent<HTMLSelectElement>) => any;
    readOnly?: boolean;
}

export interface Option {
    name: string;
    value: string | number;
}

const Select = (props: SelectProps) => {
    const [state, setState] = useState<SelectProps>({
        id: '',
        name: '',
        options: [],
        label: '',
        selectedValue: undefined,
        onChange: (e: ChangeEvent<HTMLSelectElement>) => e,
    });

    useEffect(() => {
        setState(props);
    }, [props]);

    const onChange = (e: ChangeEvent<HTMLSelectElement>) => {
        setState((prevState) => ({
            ...prevState,
            selectedValue: e.target.options[e.target.selectedIndex].value,
        }));

        if (state.onChange) {
            state.onChange(e);
        }
    };

    const makeLabel = () => {
        if (state.label) {
            return (
                <label
                    key={'label' + state.id}
                    htmlFor={state.id}
                    className="form-label"
                >
                    {state.label}
                </label>
            );
        }
        return null;
    };

    const makeOptions = () => {
        if (state.options) {
            return state.options.map((option, key) => {
                return (
                    <option
                        key={key + option.name}
                        value={option.value}
                        disabled={props.readOnly}
                    >
                        {option.name}
                    </option>
                );
            });
        }

        return null;
    };

    return (
        <div key={'div' + state.id} className="form-group">
            {makeLabel()}
            <select
                className="form-select"
                id={state.id}
                onChange={onChange}
                value={state.selectedValue}
                disabled={props.readOnly}
            >
                {makeOptions()}
            </select>
        </div>
    );
};

export default Select;
