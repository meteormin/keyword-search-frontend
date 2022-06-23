import React, { ChangeEvent, useEffect, useState } from 'react';
import DynamicTable from '../common/DaynamicTable';

export interface Permission {
  name: string;
  id: number;
}

export interface PermListProps {
  permissions: Permission[];
  activeValues: number[];
  onChange: (values: number[]) => void;
}

const PermList = ({ permissions, activeValues, onChange }: PermListProps) => {
  const [values, setValues] = useState<Set<number>>();
  const [records, setRecords] = useState<any[]>([]);
  const [isChecked, setIsChecked] = useState<Set<number>>();

  const schema = {
    name: {
      name: '권한명',
    },
    check: {
      name: '권한부여',
    },
  };

  const onChangeCheckbox = (e: ChangeEvent<HTMLInputElement>) => {
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
  };

  useEffect(() => {
    setValues(new Set(activeValues));

    setIsChecked(new Set(activeValues));

    mappingRecords();
  }, [activeValues]);

  useEffect(() => {
    if (values) {
      onChange([...values]);
      setIsChecked(values);
      mappingRecords();
    }
  }, [values]);

  const getIsChecked = (value: number): boolean => {
    if (isChecked) {
      const check = [...isChecked].filter((item) => item == value)[0];

      return !!check;
    }
    return false;
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
