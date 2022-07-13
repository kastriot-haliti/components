import * as React from 'react';
import { alpha } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import TableSortLabel from '@mui/material/TableSortLabel';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import Checkbox from '@mui/material/Checkbox';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';
import DeleteIcon from '@mui/icons-material/Delete';
import FilterListIcon from '@mui/icons-material/FilterList';
import { visuallyHidden } from '@mui/utils';
import {FC, useEffect, useState} from 'react';
import ITableColumn from '../types/ITableColumn.interface';
import ITableRow from '../types/ITableRow.interface';
import TableCellType from '../enums/tableCellType.enum';
import ITableCell from '../types/ITableCell.interface';
import EnhancedTableToolbar from './enhancedTableToolbar.component';
import EnhancedTableHead from './enhancedHead.component';


function descendingComparator<T>(a: T, b: T, orderBy: keyof T) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

const getComparator = () => {}

// function getComparator<Key extends keyof any>(
//     order: Order,
//     orderBy?: Key,
// ): (
//     a: { [key in Key]: number | string },
//     b: { [key in Key]: number | string },
// ) => number {
//     return order === 'desc'
//         ? (a, b) => descendingComparator(a, b, orderBy)
//         : (a, b) => -descendingComparator(a, b, orderBy);
// }


const stableSort = () => {}
// This method is created for cross-browser compatibility, if you don't
// need to support IE11, you can use Array.prototype.sort() directly
// function stableSort<T>(array: readonly ITableRow[], comparator: (a: T, b: T) => number) {
//   // const stabilizedThis = array.map((el, index) => [el, index] as [T, number]);
//
//   // array.sort((a, b) => {
//   //   const order = comparator(a[0], b[0]);
//   //   if (order !== 0) {
//   //     return order;
//   //   }
//   //   return a[1] - b[1];
//   // });
//   // return stabilizedThis.map((el) => el[0]);
//   return array;
// }


interface Props {
  title?: string,
  columns?: ITableColumn[],
  rows?: ITableRow[],
  dense?: boolean;
  handleOpenAddDialog(): void;
  handleOpenFilterDialog?(): void;
  handleOpenSettingsDialog?(): void;
  handleOpenDeleteDialog?(): void;
}

type Order = 'asc' | 'desc';

const EnhancedTable:FC<Props> = (props) => {
  const [columns,setColumns] = useState<ITableColumn[]>([]);
  const [rows,setRows] = useState<ITableRow[]>([])

  const [order, setOrder] = useState<Order>('asc');
  const [orderBy, setOrderBy] = useState<keyof ITableColumn>();
  const [selected, setSelected] = useState<readonly string[]>([]);
  const [page, setPage] = useState(0);
  const [dense, setDense] = useState(false);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  useEffect(()=>{
    if(props.columns) {
      setColumns(props.columns);
    }
  },[props.columns])

  useEffect(() => {
    if(props.dense != undefined) {
      setDense(props.dense);
    }
  },[props.dense])

  useEffect(()=>{
    if(props.rows) {
      setRows(props.rows);
    }
  },[props.rows])

  const handleRequestSort = (
      event: React.MouseEvent<unknown>,
      property: keyof ITableColumn,
  ) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleSelectAllClick = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked) {
      const newSelecteds = rows.map((n) => n.key);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event: React.MouseEvent<unknown>, name: string) => {
    const selectedIndex = selected.indexOf(name);
    let newSelected: readonly string[] = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, name);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
          selected.slice(0, selectedIndex),
          selected.slice(selectedIndex + 1),
      );
    }

    setSelected(newSelected);
  };

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const isSelected = (name: string) => selected.indexOf(name) !== -1;

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows =
      page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

  const showCell = (cell: ITableCell): boolean => {
    let foundColumn = columns.find(x => x.id == cell.columnId);
    return foundColumn?.show ?? false;
  }

  return <>
      <Box sx={{ width: '100%' }}>
        <Paper sx={{ width: '100%', mb: 2 }}>
          <EnhancedTableToolbar title={props.title} numSelected={selected.length}
                                handleClickAdd={props.handleOpenAddDialog}
                                handleClickFilter={props.handleOpenFilterDialog}
                                handleClickSettings={props.handleOpenSettingsDialog}
                                handleClickDelete={props.handleOpenDeleteDialog}
          />
          <TableContainer>
            <Table
                sx={{ minWidth: 750 }}
                aria-labelledby="tableTitle"
                size={dense ? 'small' : 'medium'}
            >
              <EnhancedTableHead
                  columns={columns}
                  numSelected={selected.length}
                  order={order}
                  orderBy={orderBy}
                  onSelectAllClick={handleSelectAllClick}
                  onRequestSort={handleRequestSort}
                  rowCount={rows.length}
              />
              <TableBody>

                {/*{stableSort(rows, getComparator(order, orderBy))*/}
                {rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((row, index) => {
                      const isItemSelected = isSelected(row.key);
                      const labelId = `enhanced-table-checkbox-${index}`;

                      return <>
                          <TableRow
                              hover
                              onClick={(event) => handleClick(event, row.key)}
                              role="checkbox"
                              aria-checked={isItemSelected}
                              tabIndex={-1}
                              key={row.key}
                              selected={isItemSelected}
                          >
                            <TableCell padding="checkbox">
                              <Checkbox
                                  color="primary"
                                  checked={isItemSelected}
                                  inputProps={{
                                    'aria-labelledby': labelId,
                                  }}
                              />
                            </TableCell>
                            {row.data.map((item)=>{
                              if(showCell(item)) {
                                if (item.type === TableCellType.Default) {
                                  return item.value;
                                } else {
                                  return <TableCell>{item.value}</TableCell>
                                }
                              }
                            })}
                          </TableRow>
                      </>;
                    })}
                {emptyRows > 0 && (
                    <TableRow
                        style={{
                          height: (dense ? 33 : 53) * emptyRows,
                        }}
                    >
                      <TableCell colSpan={6} />
                    </TableRow>
                )}
              </TableBody>
            </Table>
          </TableContainer>
          <TablePagination
              rowsPerPageOptions={[5, 10, 25]}
              component="div"
              count={rows.length}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Paper>
      </Box>
  </>;
}

export default EnhancedTable;
