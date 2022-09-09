import ITableRow from '../types/ITableRow.interface';
import ITableColumn from '../types/ITableColumn.interface';
import TableCellType from '../enums/tableCellType.enum';


const enhancedTableToCsv = (columns: ITableColumn[],rows: ITableRow[]) => {
  let csvData = [];
  csvData.push(columns.filter(x => x.show && x.excludeFromExport).map(x => x.label));
  rows.map((row) => {
    let tmp = row.data.map(x => {
      let foundColumn = columns.find(c => x.columnId == c.id);
      if(foundColumn && foundColumn.show && foundColumn.type != TableCellType.Default && !foundColumn.excludeFromExport) {
        return x.value
      }
    })
    csvData.push(tmp.filter(x => x != undefined))
  })

  return csvData;
};

export default enhancedTableToCsv;