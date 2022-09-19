import ITableCell from './ITableCell.interface';

interface ITableRow {
  id: string,
  key: string,
  data: ITableCell[]
}

export default ITableRow;