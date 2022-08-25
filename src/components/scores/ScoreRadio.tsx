import React, { Fragment, useEffect, useState } from 'react';
import { Col, Form } from 'react-bootstrap';

export interface ScoreRadioProps {
  name: string;
  id: string;
  selectedValue?: number | null;
  count: number;
  onChange: (value: number | string) => any;
}

const ScoreRadio = (props: ScoreRadioProps) => {
  const [count, setCount] = useState<number>(0);
  const [value, setValue] = useState<number | string>();
  const [buttons, setButtons] = useState<JSX.Element[]>();

  useEffect(() => {
    if (props.selectedValue) {
      setValue(props.selectedValue);
    }

    if (props.count) {
      setCount(props.count);
    }
  }, []);

  useEffect(() => {
    if (count) {
      setButtons(makeRadioButtons(count));
    }
  }, [count]);

  useEffect(() => {
    if (value) {
      props.onChange(value);
    }
  }, [value]);

  useEffect(() => {
    if (props.selectedValue) {
      setButtons(makeRadioButtons(count));
    }
  }, [props.selectedValue]);

  const Radio = (rValue: number) => {
    return (
      <Fragment key={rValue}>
        <Col lg={1}></Col>
        <Col lg={2}>
          <Form.Check
            type="radio"
            value={rValue}
            id={'score_radio_' + props.id + rValue.toString()}
            label={rValue.toString()}
            name={'score_radio_' + props.name + rValue.toString()}
            checked={value == rValue}
            onChange={(e) => {
              const target = e.target as HTMLInputElement;
              setValue(target.value);
            }}
          />
        </Col>
      </Fragment>
    );
  };

  const makeRadioButtons = (rCount: number) => {
    const elements = [];

    console.log(rCount);
    for (let i = rCount; i > 0; i--) {
      elements.push(Radio(i - 1));
    }

    return elements;
  };

  return <Fragment>{buttons}</Fragment>;
};

export default ScoreRadio;
