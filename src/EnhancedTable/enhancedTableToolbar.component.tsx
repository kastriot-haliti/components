import * as React from 'react';
import Toolbar from '@mui/material/Toolbar';
import {alpha} from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import Tooltip from '@mui/material/Tooltip';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import FilterListIcon from '@mui/icons-material/FilterList';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import SettingsIcon from '@mui/icons-material/Settings';
import {useEffect, useState,FC} from 'react';

interface Props {
  title?: string,
  numSelected: number;

  handleClickAdd?(): void;

  handleClickEdit?(): void;

  handleClickDelete?(): void;
  handleClickFilter?(): void;
  handleClickSettings?(): void;
}

const EnhancedTableToolbar: FC<Props> = (props: Props) => {
  const [title,setTitle] = useState<string>('')
  const [numSelected,setNumSelected] = useState<number>(0);

  useEffect(() => {
    if(props.numSelected != undefined) {
      setNumSelected(props.numSelected);
    }
  },[props.numSelected])

  useEffect(()=>{
    if(props.title) {
      setTitle(props.title);
    }
  },[props.title])

  const showTitle = () => numSelected == 0
  const showCountSelected = () => numSelected > 0

  const showFilterIcon = () => numSelected == 0
  const showSettingsIcon = () => numSelected == 0
  const showAddIcon = () => numSelected == 0
  const showEditIcon = () => numSelected == 1
  const showDeleteIcon = () => numSelected > 0

  return <>
      <Toolbar
          sx={{
            pl: { sm: 2 },
            pr: { xs: 1, sm: 1 },
            ...(numSelected > 0 && {
              bgColor: (theme) =>
                  alpha(theme.palette.primary.main, theme.palette.action.activatedOpacity),
            }),
          }}
      >
        {showCountSelected() && <Typography
            sx={{ flex: '1 1 100%' }}
            color="inherit"
            variant="subtitle1"
            component="div"
        >
          {numSelected} selected
        </Typography>}

        {showTitle() && <Typography
            color="primary"
            sx={{ flex: '1 1 100%' }}
            variant="h6"
            id="tableTitle"
            component="div"
        >
          {title}
        </Typography>}

        {showEditIcon() && <Tooltip title="Edit">
          <IconButton color="primary" onClick={props.handleClickEdit}>
            <EditIcon />
          </IconButton>
        </Tooltip>}

        {showDeleteIcon() && <Tooltip title="Delete">
          <IconButton color="primary" onClick={props.handleClickDelete}>
            <DeleteIcon />
          </IconButton>
        </Tooltip>}

        {showAddIcon() && <Tooltip title="Add">
          <IconButton color="primary" onClick={props.handleClickAdd}>
            <AddIcon />
          </IconButton>
        </Tooltip>}

        {showFilterIcon() && <Tooltip title="Filter list">
          <IconButton color="primary" onClick={props.handleClickFilter}>
            <FilterListIcon />
          </IconButton>
        </Tooltip>}

        {showSettingsIcon() && <Tooltip title="Settings">
          <IconButton color="primary" onClick={props.handleClickSettings}>
            <SettingsIcon />
          </IconButton>
        </Tooltip>}
      </Toolbar>
  </>;
};

export default EnhancedTableToolbar;