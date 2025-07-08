import { ColumnDataSchemaModel } from '@revolist/react-datagrid';
import React from 'react';
import { FaDownload } from 'react-icons/fa6';

interface RemoveCellButtonProps extends ColumnDataSchemaModel {
  handleClick: () => void;
}

export default function DownloadCellButton({ column, handleClick }: RemoveCellButtonProps) {
  return (
    <div style={{ padding: '8px' }}>
      <FaDownload size={30} onClick={handleClick} color="blue" />
    </div>
  );
}
