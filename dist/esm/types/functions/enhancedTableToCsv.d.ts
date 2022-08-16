import ITableRow from '../types/ITableRow.interface';
import ITableColumn from '../types/ITableColumn.interface';
declare const enhancedTableToCsv: (columns: ITableColumn[], rows: ITableRow[]) => string[][];
export default enhancedTableToCsv;
