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
import {Button, Menu, MenuItem} from '@mui/material';
import FileDownloadIcon from '@mui/icons-material/FileDownload';

interface Props {
  multiSelection?: boolean,
  title?: string,
  numSelected: number;

  handleClickAdd?(): void;

  handleClickEdit?(): void;

  handleClickDelete?(): void;
  handleClickFilter?(): void;
  handleClickSettings?(): void;
  handleExport?(type: string): void;
}

const EnhancedTableToolbar: FC<Props> = (props: Props) => {
  const [multiSelection,setMultiSelection] = useState<boolean>(false);
  const [title,setTitle] = useState<string>('')
  const [numSelected,setNumSelected] = useState<number>(0);

  useEffect(() => {
    if(props.multiSelection) { setMultiSelection(props.multiSelection) }
  },[props.multiSelection])

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

  const showTitle = () => numSelected == 0 || !multiSelection
  const showCountSelected = () => numSelected > 0 && multiSelection

  const showFilterIcon = () => numSelected == 0
  const showSettingsIcon = () => numSelected == 0
  const showAddIcon = () => numSelected == 0
  const showEditIcon = () => numSelected == 1
  const showDeleteIcon = () => numSelected > 0

  const [anchorExportMenu, setAnchorExportMenu] = React.useState<null | HTMLElement>(null);
  const openExportMenu = Boolean(anchorExportMenu);
  const handleExportClickOpen = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorExportMenu(event.currentTarget);
  };
  const handleExportClickClose = () => {
    setAnchorExportMenu(null);
  };

  const exportCsv = () => {
    handleExportClickClose()
    if(props.handleExport)
    props.handleExport('csv')
  }

  const exportPdf = () => {
    handleExportClickClose()
    if(props.handleExport)
    props.handleExport('pdf')
  }

  const print = () => {
    handleExportClickClose()
    if(props.handleExport)
    props.handleExport('print')
  }

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
        <div style={{display: 'flex'}}>
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

          {showAddIcon() &&
            <Button color={"primary"} onClick={props.handleClickAdd} variant="contained" size="small" style={{ marginLeft: 'auto'}}>
              <AddIcon />
              <Typography >Add</Typography>
            </Button>}
        </div>


{/*        {showEditIcon() && <Tooltip title="Edit">
          <IconButton color="primary" onClick={props.handleClickEdit}>
            <EditIcon />
          </IconButton>
        </Tooltip>}

        {showDeleteIcon() && <Tooltip title="Delete">
          <IconButton color="primary" onClick={props.handleClickDelete}>
            <DeleteIcon />
          </IconButton>
        </Tooltip>}*/}


        <div style={{display: 'flex',marginLeft: 'auto'}}>
        <IconButton color="primary" onClick={handleExportClickOpen}><FileDownloadIcon /></IconButton>
        <Menu
            id="basic-menu"
            anchorEl={anchorExportMenu}
            open={openExportMenu}
            onClose={handleExportClickClose}
            MenuListProps={{
              'aria-labelledby': 'basic-button',
            }}
        >
          <MenuItem value={'csv'} onClick={exportCsv}>Download as CSV</MenuItem>
          <MenuItem value={'pdf'} onClick={exportPdf}>Download as Pdf</MenuItem>
          <MenuItem value={'print'} onClick={print}>Print</MenuItem>
        </Menu>

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
        </div>
      </Toolbar>
  </>;
};

export default EnhancedTableToolbar;