import ITableCell from './ITableCell.interface';

interface ITableRow {
  key: string,
  data: ITableCell[]
}

export default ITableRow;