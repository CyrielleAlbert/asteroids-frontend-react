import React from 'react';

export const Attribute = ({ name, value }: { name: string; value: string | number }) => {
  return (
    <div className="flex flex-row gap-2">
      <p className="text-sm font-bold">{name}</p>
      <p className="text-sm">{value}</p>
    </div>
  );
};
