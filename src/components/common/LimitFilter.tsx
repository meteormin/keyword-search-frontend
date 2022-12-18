import Select, { Option } from 'components/common/Select';
import React from 'react';

const limitOptions: Option[] = [
  {
    name: '10개씩 보기',
    value: 10,
  },
  {
    name: '50개씩 보기',
    value: 50,
  },
  {
    name: '100개씩 보기',
    value: 100,
  },
];

export interface LimitFilterProps {
  selectedValue?: any;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => any;
}

const LimitFilter = (props: LimitFilterProps) => {
  return (
    <Select
      options={limitOptions}
      selectedValue={props.selectedValue}
      onChange={props.onChange}
      id="LimitFilter"
      name="LimitFilter"
    />
  );
};

export default LimitFilter;
