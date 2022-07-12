import {ITableCell} from './ITableCell.interface.ts';

export interface ITableRow {
  key: string,
  data: ITableCell[]
}