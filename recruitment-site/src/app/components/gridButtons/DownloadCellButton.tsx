import { ColumnDataSchemaModel } from '@revolist/react-datagrid';
import React from 'react';
import { MdDelete } from 'react-icons/md';

interface RemoveCellButtonProps extends ColumnDataSchemaModel {
  handleClick: () => void;
}

export default function DownloadCellButton({ column, handleClick }: RemoveCellButtonProps) {
  return (
    <div style={{ padding: '8px' }}>
      <MdDelete size={30} onClick={handleClick} color="blue" />
    </div>
  );
}
