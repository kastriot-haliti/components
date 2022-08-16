import * as React from 'react';
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Checkbox from '@mui/material/Checkbox';
import {FC, useEffect, useState} from 'react';
import ITableColumn from '../types/ITableColumn.interface';
import ITableRow from '../types/ITableRow.interface';
import TableCellType from '../enums/tableCellType.enum';
import ITableCell from '../types/ITableCell.interface';
import EnhancedTableHead from './enhancedHead.component';

interface Props {
  multiSelection?: boolean,
  title?: string,
  columns?: ITableColumn[],
  rows?: any[],
  dense?: boolean;
  handleOpenAddDialog?(): void;
  handleOpenFilterDialog?(): void;
  handleOpenSettingsDialog?(): void;
  handleOpenDeleteDialog?(): void;
  handleSelectRows?(selected: number[]): void;
  width?: number
}

type Order = 'asc' | 'desc';

const EnhancedTableBody:FC<Props> = (props) => {
  const [multiSelection,setMultiSelection] = useState<boolean>(false);
  const [columns,setColumns] = useState<ITableColumn[]>([]);
  const [rows,setRows] = useState<ITableRow[]>([])

  const [order, setOrder] = useState<Order>('asc');
  const [orderBy, setOrderBy] = useState<keyof ITableColumn>();
  const [selected, setSelected] = useState<number[]>([]);
  const [page, setPage] = useState(0);
  const [dense, setDense] = useState(false);
  const [rowsPerPage, setRowsPerPage] = useState(5);
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

  const handleClickMulti = (event: React.MouseEvent<unknown>,id: number) => {
    let newSelected: any[] = []
    const foundSelected = selected.find(x => x === id);
    if(!foundSelected) {
      newSelected = [...selected,id];
    } else {
      newSelected = selected.filter(x => x != id);
    }

    setSelected(newSelected);
  }

  const handleClickSingle = (event: React.MouseEvent<unknown>,id: number) => {
    let newSelected: any[] = [];
    const foundSelected = selected.find(x => x === id);
    if(!foundSelected) {
      newSelected = [id];
    }else{
      newSelected = [];
    }
    setSelected(newSelected);
  }

  const handleClick = (event: React.MouseEvent<unknown>,id: number) => {
    if(multiSelection) {
      handleClickMulti(event,id);
    }else{
      handleClickSingle(event,id);
    }
  };

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const isSelected = (id: number) => !!selected.find(x => x === id);

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows =
      page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

  const showCell = (cell: ITableCell): boolean => {
    let foundColumn = columns.find(x => x.id == cell.columnId);
    return foundColumn?.show ?? false;
  }

  return <>
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
              {rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((row, index) => {
                    const isItemSelected = isSelected(row.id);
                    const labelId = `enhanced-table-checkbox-${index}`;

                    return <>
                      <TableRow
                          hover
                          onClick={(event) => handleClick(event, row.id)}
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
  </>;
}

export default EnhancedTableBody;
