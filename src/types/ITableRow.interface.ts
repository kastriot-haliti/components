import {ITableCell} from './ITableCell.interface';

export interface ITableRow {
  key: string,
  data: ITableCell[]
}