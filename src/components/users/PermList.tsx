import React, { ChangeEvent, useEffect, useState } from 'react';
import DynamicTable from '../common/DaynamicTable';
import { bool } from 'prop-types';

export interface Permission {
  name: string;
  id: number;
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
  activeValues: number[];
  onChange: (values: number[]) => void;
}

const PermList = ({ permissions, activeValues, onChange }: PermListProps) => {
  const [values, setValues] = useState<Set<number>>(new Set(activeValues));
  const [records, setRecords] = useState<any[]>([]);
  const [isChecked, setIsChecked] = useState<Set<number>>(
    new Set(activeValues),
  );
  const schema = {
    name: {
      name: '권한명',
    },
    check: {
      name: '권한부여',
    },
  };

  const onChangeCheckbox = (e: ChangeEvent<HTMLInputElement>) => {
    console.log('??', activeValues);
    const tempSet = new Set(values);

    if (e.target.checked) {
      tempSet.add(parseInt(e.target.value));
      setValues(tempSet);
      setIsChecked(tempSet);
    } else {
      tempSet.delete(parseInt(e.target.value));
      setValues(tempSet);
      setIsChecked(tempSet);
    }

    onChange([...values]);
  };

  // useEffect(() => {}, []);

  useEffect(() => {
    setValues(new Set(activeValues));
    console.log(activeValues);

    setIsChecked(new Set(activeValues));
    console.log(isChecked);
    mappingRecords();
  }, [activeValues, permissions]);

  const getIsChecked = (value: number): boolean => {
    const check = [...isChecked].filter((item) => item == value)[0];
    console.log(value, check);
    return !!check;
  };

  const mappingRecords = () => {
    setRecords(
      permissions.map((perm) => {
        return {
          name: perm.name,
          check: (
            <input
              className="form-check-input"
              id={perm.name}
              type="checkbox"
              name={perm.name}
              defaultValue={perm.id}
              onChange={onChangeCheckbox}
              checked={getIsChecked(perm.id)}
            />
          ),
        };
      }),
    );
  };

  return (
    <div id="permList">
      <DynamicTable schema={schema} records={records} />
    </div>
  );
};
export default PermList;