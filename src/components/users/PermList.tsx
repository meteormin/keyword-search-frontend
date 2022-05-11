import React, { ChangeEvent, useState } from 'react';
import { DynamicTable } from '../common/DaynamicTable';

export interface Permission {
  name: string;
  value: string;
}

export interface PermRecord {
  name: string;
  check: any;
}

export interface PermListState {
  values: string[] | number[];
}

export interface PermListProps {
  permissions: Permission[];
  onChange: (values: string[] | number[]) => void;
}

const PermList = ({ permissions, onChange }: PermListProps) => {
  const [values, setValues] = useState<string[] | number[]>([]);
  const schema = {
    name: {
      name: '권한명',
    },
    check: {
      name: '권한부여',
    },
  };

  const record: PermRecord = {
    name: '',
    check: null,
  };

  const onChangeCheckbox = (e: ChangeEvent<HTMLInputElement>) => {
    console.log('check:', e.target.checked);
    if (e.target.checked) {
      if (!(e.target.value in values.values())) {
        console.log('check:', e.target.value);
        const tempList: Array<string | number> = values;
        tempList.push(e.target.value);
        setValues(tempList as string[] | number[]);
      }
    } else {
      const tempList: Array<string | number> = values;
      const index = tempList.indexOf(e.target.value);
      console.log(index);
      if (index !== -1) {
        tempList.splice(index, 1);
        setValues(tempList as string[] | number[]);
      }
    }
    onChange(values);
  };

  const records = permissions.map((perm) => {
    return {
      name: perm.name,
      check: (
        <input
          className="form-check-input"
          id={perm.name}
          type="checkbox"
          name={perm.name}
          defaultValue={perm.value}
          readOnly={true}
          onChange={onChangeCheckbox}
        />
      ),
    };
  });

  return (
    <div id="permList">
      <DynamicTable schema={schema} records={records} />
    </div>
  );
};

export default PermList;
