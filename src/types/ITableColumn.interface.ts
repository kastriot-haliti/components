import TableCellType from '../enums/tableCellType.enum';

interface ITableColumn {
  id: string,
  label: string;
  minWidth?: number;
  align?: 'right' | 'left' | 'center';
  format?: (value: number) => string;
  type?: TableCellType;
  disablePadding: boolean;
  show: boolean;
  excludeFromExport?: boolean
}

export default ITableColumn;