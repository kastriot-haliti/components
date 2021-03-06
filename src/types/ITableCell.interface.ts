import TableCellType from '../enums/tableCellType.enum';

interface ITableCell {
  key: string,
  minWidth?: number;
  align?: 'right' | 'left' | 'center';
  format?: (value: number) => string;
  type?: TableCellType,
  value: string;
  columnId: string;
}

export default ITableCell;