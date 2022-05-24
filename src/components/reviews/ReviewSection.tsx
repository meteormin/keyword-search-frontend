import React, { useEffect } from 'react';
import { Col, FloatingLabel, Form } from 'react-bootstrap';
import ReactSelect from 'react-select';
import CheckBoxOption from '../common/CheckBoxOption';
import { config } from '../../helpers';
import { Fragment, useState } from 'react';
import { ReviewResult as ReviewResultEnum } from '../common/WorkSpace';

export interface ReviewResultState {
  radio: ReviewResultEnum;
  check?: number[];
  memo?: string;
}

export interface ReviewResultProps {
  seq: number;
  data?: any;
  readOnly?: boolean;
  onChange: (state: ReviewResultState) => any;
}

const ReviewSection = (props: ReviewResultProps) => {
  const [radio, setRadio] = useState<ReviewResultEnum>(ReviewResultEnum.FAIL);
  const [check, setCheck] = useState<number[]>([]);
  const [memo, setMemo] = useState<string>('');

  const selectOptions = config.selectOptions.rejectReason.map((i) => ({
    label: i.name,
    value: i.value,
  }));

  const reasonList = selectOptions.map((v) => {
    return v.value as number;
  });

  const getSelectOptionByValue = (
    value: number,
  ): { label: string; value: string | number } => {
    return selectOptions.filter((option) => {
      return option.value == value;
    })[0];
  };

  useEffect(() => {
    if (props.data) {
      setRadio(props.data.radio);
      setCheck(props.data.check);
      setMemo(props.data.memo);
    }
  }, [props.data]);

  useEffect(() => {
    props.onChange({
      radio,
      check,
      memo,
    });
  }, [check, memo, radio]);

  return (
    <Fragment>
      <Col className="mt-2">
        <Form.Check
          type="radio"
          id={ReviewResultEnum.PASS + props.seq}
          name={'reviewResult' + props.seq}
          label="승인"
          value={ReviewResultEnum.PASS}
          inline
          checked={radio == ReviewResultEnum.PASS}
          onChange={(e) => {
            setRadio(e.target.value as ReviewResultEnum);
          }}
          disabled={props.readOnly || false}
        />
      </Col>
      <Col className="mt-2">
        <Form.Check
          type="radio"
          id={ReviewResultEnum.FAIL + props.seq}
          name={'reviewResult' + props.seq}
          label="반려"
          value={ReviewResultEnum.FAIL}
          checked={radio == (ReviewResultEnum.FAIL || null)}
          inline
          onChange={(e) => {
            setRadio(e.target.value as ReviewResultEnum);
          }}
          disabled={props.readOnly || false}
        />
      </Col>
      {radio == ReviewResultEnum.FAIL || null ? (
        <Fragment>
          <Col>
            <ReactSelect
              isMulti
              closeMenuOnSelect={false}
              hideSelectedOptions={false}
              components={{
                Option: CheckBoxOption,
              }}
              id="rejectReason"
              name="rejectReason"
              options={selectOptions}
              value={check?.map(
                (i): { label: string; value: string | number } =>
                  getSelectOptionByValue(i),
              )}
              onChange={(e) => {
                console.log(e);
                const multiCheck: number[] = e.map((v: any): number => v.value);
                setCheck(multiCheck);
              }}
              isDisabled={props.readOnly || false}
            ></ReactSelect>
          </Col>
          {check?.includes(reasonList[reasonList.length - 1]) ? (
            <Col>
              <FloatingLabel
                controlId={'memo' + props.seq}
                label="기타 사유"
                className="mb-3"
              >
                <Form.Control
                  type="text"
                  name={'memo' + props.seq}
                  value={memo}
                  placeholder="기타 사유"
                  onChange={(e) => {
                    setMemo(e.target.value);
                  }}
                  readOnly={props.readOnly || false}
                />
              </FloatingLabel>
            </Col>
          ) : null}
        </Fragment>
      ) : null}
    </Fragment>
  );
};

export default ReviewSection;
