import * as React from 'react';
import {FC, useEffect, useState} from 'react';
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Checkbox from '@mui/material/Checkbox';
import ITableColumn from '../types/ITableColumn.interface';
import ITableRow from '../types/ITableRow.interface';
import TableCellType from '../enums/tableCellType.enum';
import ITableCell from '../types/ITableCell.interface';
import EnhancedTableToolbar from './enhancedTableToolbar.component';
import EnhancedTableHead from './enhancedHead.component';
import {IconButton, Menu, MenuItem} from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import ActionType from '../enums/action-type.enum';
import PlaylistAddCheckIcon from '@mui/icons-material/PlaylistAddCheck';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import ClearIcon from '@mui/icons-material/Clear';
import jspdf from 'jspdf';
import autoTable from 'jspdf-autotable';
import enhancedTableToCsv from '../functions/enhancedTableToCsv';

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
  multiSelection?: boolean,
  title?: string,
  columns?: ITableColumn[],
  rows?: any[],
  dense?: boolean;
  handleOpenAddDialog(): void;
  handleOpenFilterDialog?(): void;
  handleOpenSettingsDialog?(e:any): void;
  handleOpenDeleteDialog?(): void;
  handleSelectRows(selected: string[]): void;
  handleExport?(type: string): void;
  handleAction?(action: ActionType,item: any): void;
  width?: number,
  rowsPerPage?: number
}

type Order = 'asc' | 'desc';

const EnhancedTable:FC<Props> = (props) => {
  const [multiSelection,setMultiSelection] = useState<boolean>(false);
  const [columns,setColumns] = useState<ITableColumn[]>([]);
  const [rows,setRows] = useState<ITableRow[]>([])

  const [order, setOrder] = useState<Order>('asc');
  const [orderBy, setOrderBy] = useState<keyof ITableColumn>();
  const [selected, setSelected] = useState<string[]>([]);
  const [actionId,setActionId] = useState<string>('');
  const [page, setPage] = useState(0);
  const [dense, setDense] = useState(true);
  const [rowsPerPage, setRowsPerPage] = useState(props.rowsPerPage ?? 25);
  const [width,setWidth] = useState<number>(100);

  useEffect(() => {
    if(props.multiSelection) { setMultiSelection(props.multiSelection) }
  },[props.multiSelection])

  useEffect(() => {
    if(props.width) {
      setWidth(props.width)
    }
  },[props.width])

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

  useEffect(() => {
    if(selected != undefined) {
      props.handleSelectRows(selected)
    }
  },[selected])

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
      const newSelecteds = rows.map((n) => n.id);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };

  const handleClickMulti = (id: string) => {
    let newSelected: any[] = []
    const foundSelected = selected.find(x => x === id);
    if(!foundSelected) {
      newSelected = [...selected,id];
    } else {
      newSelected = selected.filter(x => x != id);
    }

    setSelected(newSelected);
  }

  const handleClickSingle = (id: string) => {
    let newSelected: any[] = [];
    const foundSelected = selected.find(x => x === id);
    if(!foundSelected) {
      newSelected = [id];
    }else{
      newSelected = [];
    }
    setSelected(newSelected);
  }

  const handleClick = (id: string) => {
    if(multiSelection) {
      handleClickMulti(id);
    }else{
      handleClickSingle(id);
    }
  };

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const isSelected = (id: string) => !!selected.find(x => x === id);

  const openActionMenu = (id: string) => id === actionId;

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows =
      page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

  const showCell = (cell: ITableCell): boolean => {
    let foundColumn = columns.find(x => x.id == cell.columnId);
    return foundColumn?.show ?? false;
  }

  const [anchorActionMenu, setAnchorActionMenu] = React.useState<null | HTMLElement>(null);
  const handleOpenAction = (event: React.MouseEvent<HTMLButtonElement>,id: string) => {
    setAnchorActionMenu(event.currentTarget);
    setActionId(id);
  }
  const handleCloseAction = () => {
    setAnchorActionMenu(null);
    setActionId('');
  }

 /*  const [anchorActionMenu, setAnchorActionMenu] = React.useState<null | HTMLElement>(null);
  // const openActionMenu = Boolean(anchorActionMenu);
  const handleMenuClickOpen = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorActionMenu(event.currentTarget);
  };
  const handleMenuClickClose = () => {
    setAnchorActionMenu(null);
  };*/

  const handleDeleteAction = (id: string) => {
    handleCloseAction();
    if(props.handleAction) {
      props.handleAction(ActionType.delete, id)
    }
  }
  const handleEditAction = (id: string) => {
    handleCloseAction();
    if(props.handleAction) {
      props.handleAction(ActionType.edit, id)
    }
  }
  const handleCheckinAction = (id: string) => {
    handleCloseAction();
    if(props.handleAction) {
      props.handleAction(ActionType.checkin, actionId)
    }
  }
  const handleCheckoutAction = (id: string) => {
    handleCloseAction();
    if(props.handleAction) {
      props.handleAction(ActionType.checkout, actionId)
    }
  }
  const handleCancelAction = (id: string) => {
    handleCloseAction();
    if(props.handleAction) {
      props.handleAction(ActionType.cancel, actionId)
    }
  }

  /*const exportCsv = (data: any[], fileName: string = 'export') => {
    let csv = '';

    data.forEach(function(row) {
      csv += row.join(',');
      csv += "\n";
    });

    let hiddenElement = document.createElement('a');
    hiddenElement.href = 'data:text/csv;charset=utf-8,' + encodeURI(csv);
    hiddenElement.target = '';

    hiddenElement.download = fileName + '.csv';
    hiddenElement.click();
  }

  const handleCsv = (fileName='download') => {
    let csvData = enhancedTableToCsv(columns,rows);

    exportCsv(csvData,fileName);
  }

  const handlePdf = (fileName='download') => {
    fileName = fileName + '.pdf';
    const pdf = new jspdf();

    let head = [];
    let body: any[][] = [];

    head.push(columns.filter(x => x.show && x.type != TableCellType.Default && x.id != 'columnId').map(x => x.label));
    rows.map((row) => {
      let tmp = row.data.map(x => {
        let foundColumn = columns.find(c => x.columnId == c.id);
        if(foundColumn && foundColumn.show && foundColumn.type != TableCellType.Default && foundColumn.id != 'columnId') {
          return x.value
        }
      })
      body.push(tmp.filter(x => x != undefined))
    })

    autoTable(pdf, {
      head: head,
      body: body,
    })

    pdf.save(fileName);
  }*/

  const handleExport = (type: string) => {
    if(type === 'csv') {
      // handleCsv();
    }
    else if (type === 'pdf') {
      // handlePdf();
    }
  }

  return <>
      <Box sx={{ width: width+'%' }}>
        <Paper sx={{ width: '100%', mb: 2 }}>
          <EnhancedTableToolbar multiSelection={multiSelection}
                                title={props.title} numSelected={selected.length}
                                handleClickAdd={props.handleOpenAddDialog}
                                handleClickEdit={props.handleOpenAddDialog}
                                handleClickFilter={props.handleOpenFilterDialog}
                                handleClickSettings={props.handleOpenSettingsDialog}
                                handleClickDelete={props.handleOpenDeleteDialog}
                                handleExport={props.handleExport}
          />
          <TableContainer>
            <Table

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

                      const isItemSelected = isSelected(row.id);
                      const labelId = `enhanced-table-checkbox-${index}`;

                      return <>
                          <TableRow
                              hover
                              role="checkbox"
                              aria-checked={isItemSelected}
                              tabIndex={-1}
                              key={row.key}
                              selected={isItemSelected}
                          >
                            <TableCell padding="checkbox">
                              <Checkbox
                                  onClick={(event) => handleClick(row.id)}
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
                                  return item.displayValue ? item.displayValue : item.value;
                                } else if(item.type === TableCellType.Actions) {
                                  return <TableCell align={item.align}>
                                    <IconButton onClick={(el) => handleOpenAction(el,row.id)}> <MoreVertIcon /> </IconButton>
                                    <Menu
                                        id="basic-menu"
                                        anchorEl={anchorActionMenu}
                                        open={openActionMenu(row.id)}
                                        onClose={handleCloseAction}
                                        MenuListProps={{
                                          'aria-labelledby': 'basic-button',
                                        }}
                                    >
                                      {(item.value as ActionType[])?.includes(ActionType.delete) && <MenuItem value={ActionType.delete} onClick={() => handleDeleteAction(row.id)}> <DeleteIcon color={"primary"} /> Delete</MenuItem>}
                                      {(item.value as ActionType[])?.includes(ActionType.edit) && <MenuItem value={ActionType.edit} onClick={() => handleEditAction(row.id)}> <EditIcon color={"primary"} /> Edit</MenuItem>}
                                      {(item.value as ActionType[])?.includes(ActionType.checkin) && <MenuItem value={ActionType.checkin} onClick={() => handleCheckinAction(row.id)}> <PlaylistAddCheckIcon color={"primary"} /> Check IN</MenuItem>}
                                      {(item.value as ActionType[])?.includes(ActionType.checkout) && <MenuItem value={ActionType.checkout} onClick={() => handleCheckoutAction(row.id)}> <PlaylistAddCheckIcon color={"primary"} /> Check OUT</MenuItem>}
                                      {(item.value as ActionType[])?.includes(ActionType.cancel) && <MenuItem value={ActionType.cancel} onClick={() => handleCancelAction(row.id)}> <ClearIcon color={"primary"} /> Cancel</MenuItem>}
                                    </Menu>
                                  </TableCell>
                                } else {
                                  return <TableCell>{item.displayValue ? item.displayValue : item.value}</TableCell>
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
