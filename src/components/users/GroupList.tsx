import React from 'react';
import DynamicTable from '../common/DaynamicTable';

export interface GroupInfo {
  no: number;
  id: number;
  groupCode: string;
  groupName: string;
  operation: any;
}

export interface GroupListProps {
  groups: GroupInfo[];
  onClick: (group: GroupInfo) => any;
}

const GroupList = ({ groups, onClick }: GroupListProps) => {
  const schema = {
    no: {
      name: 'No',
      primaryKey: true,
    },
    groupCode: {
      name: '그룹코드',
    },
    groupName: {
      name: '그룹명',
    },
    operation: {
      name: '운영',
    },
  };

  return (
    <div id="groupList">
      <DynamicTable schema={schema} records={groups} onClick={onClick} />
    </div>
  );
};

export default GroupList;
