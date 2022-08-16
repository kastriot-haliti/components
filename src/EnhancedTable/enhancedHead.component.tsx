import * as React from 'react';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import Checkbox from '@mui/material/Checkbox';
import TableSortLabel from '@mui/material/TableSortLabel';
import Box from '@mui/material/Box';
import {visuallyHidden} from '@mui/utils';
import {useEffect, useState,FC,MouseEvent,ChangeEvent} from 'react';
import {TableHead} from '@mui/material';
import ITableColumn from '../types/ITableColumn.interface';

interface Props {
  multiSelection?: boolean,
  columns: ITableColumn[],
  numSelected: number;
  onRequestSort: (event: MouseEvent<unknown>, property: keyof ITableColumn) => void;
  onSelectAllClick: (event: ChangeEvent<HTMLInputElement>) => void;
  order: Order;
  orderBy?: string;
  rowCount: number;
}

type Order = 'asc' | 'desc';

const EnhancedTableHead:FC<Props> = (props: Props) => {
  const [multiSelection,setMultiSelection] = useState<boolean>(false);
  const [columns,setColumns] = useState<ITableColumn[]>([]);

  useEffect(() => {
    if(props.multiSelection) { setMultiSelection(props.multiSelection) }
  },[props.multiSelection])

  useEffect(()=>{
    if(props.columns) {
      setColumns(props.columns);
    }
  },[props.columns])

  const createSortHandler =
      (property: keyof any) => (event: React.MouseEvent<unknown>) => {
        // props.onRequestSort(event, property);
      };

  return <>
      <TableHead>
        <TableRow>
          <TableCell padding="checkbox">
            {multiSelection && <Checkbox
                color="primary"
                indeterminate={props.numSelected > 0 && props.numSelected < props.rowCount}
                checked={props.rowCount > 0 && props.numSelected === props.rowCount}
                onChange={props.onSelectAllClick}
                inputProps={{
                  'aria-label': 'select all desserts',
                }}
            />}
          </TableCell>
          {columns.map((column) => {
              if(column.show) {
                return <TableCell
                    key={column.id}
                    align={column.align}
                    padding={column.disablePadding ? 'none' : 'normal'}
                    sortDirection={props.orderBy === column.id ? props.order : false}
                >
                  <TableSortLabel
                      active={props.orderBy === column.id}
                      direction={props.orderBy === column.id ? props.order : 'asc'}
                      onClick={createSortHandler(column.id)}
                  >
                    {column.label}
                    {props.orderBy === column.id ? (
                        <Box component="span" sx={visuallyHidden}>
                          {props.order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                        </Box>
                    ) : null}
                  </TableSortLabel>
                </TableCell>
              }
          })}
        </TableRow>
      </TableHead>
  </>;
}

export default EnhancedTableHead;