import React from 'react';

type Props = {
  content: React.ReactNode;
  type: 'error' | 'warning' | 'success' | 'info';
};
export const Lozenge = (props: Props) => {
  const getLozengeColor = () => {
    switch (props.type) {
      case 'error':
        return 'bg-red-200';
      case 'warning':
        return 'bg-yellow-200';
      case 'success':
        return 'bg-green-200';
      case 'info':
        return 'bg-blue-200';
      default:
        return 'bg-blue-200';
    }
  };

  return <div className={getLozengeColor() + ' rounded-full py-1 px-2'}>{props.content}</div>;
};
