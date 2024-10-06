import React from 'react';
import { Button, Input } from 'antd';
import { SearchOutlined } from '@ant-design/icons';

type DatePickerProps = {
  startDate?: string;
  endDate?: string;
  setStartDate: React.ChangeEventHandler<HTMLInputElement>;
  setEndDate: React.ChangeEventHandler<HTMLInputElement>;
  handleSearch: () => void;
  disabled: boolean;
};

export const DatePickerBar = (props: DatePickerProps) => {
  return (
    <div className="flex justify-between gap-4">
      <Input
        size="large"
        id="startDateInput"
        maxLength={10}
        value={props.startDate}
        onChange={props.setStartDate}
        type="date"
      />
      <Input
        size="large"
        id="endDateInput"
        maxLength={10}
        value={props.endDate}
        onChange={props.setEndDate}
        type="date"
      />
      <Button type="primary" icon={<SearchOutlined />} onClick={props.handleSearch} disabled={props.disabled}>
        Discover asteroids
      </Button>
    </div>
  );
};
