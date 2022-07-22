import ITableCell from './ITableCell.interface';
interface ITableRow {
    id: number;
    key: string;
    data: ITableCell[];
}
export default ITableRow;
