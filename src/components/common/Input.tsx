import React, { ChangeEvent, FocusEvent, useState, useEffect } from 'react';

export type InputProp = {
    type: 'text' | 'email' | 'password';
    label?: string;
    id: string;
    name: string;
    value: any;
    onChange?: (e: ChangeEvent<HTMLInputElement>) => any;
    readonly?: boolean;
    placeholder?: string;
    onBlur?: (e: FocusEvent<HTMLInputElement>) => any;
};

function Input(props: InputProp) {
    const [state, setState] = useState<InputProp>({
        type: 'text',
        name: '',
        id: '',
        value: '',
    });

    useEffect(() => {
        setState(props);
    }, [props]);

    const onChange = (e: ChangeEvent<HTMLInputElement>) => {
        setState({ ...state, value: e.target.value });

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

    return (
        <div key={'div' + state.id} className="form-group">
            {makeLabel()}
            <input
                key={'input' + state.id}
                className="form-control"
                type={state.type}
                name={state.name}
                id={state.id}
                value={state.value || ''}
                onChange={onChange}
                readOnly={state?.readonly || false}
                placeholder={state.placeholder || ''}
                onBlur={props.onBlur}
            />
        </div>
    );
}

export default Input;
