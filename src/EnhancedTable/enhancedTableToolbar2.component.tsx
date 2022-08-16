import * as React from 'react';
import Toolbar from '@mui/material/Toolbar';
import {alpha} from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import {useEffect, useState,FC} from 'react';

interface Props {
  multiSelection?: boolean,
  title?: string,
  numSelected?: number;

  handleClickAdd?(): void;

  handleClickEdit?(): void;

  handleClickDelete?(): void;
  handleClickFilter?(): void;
  handleClickSettings?(): void;
  children?: any
}

const EnhancedTableToolbar2: FC<Props> = (props: Props) => {
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
        {props.children}
      </Toolbar>
  </>;
};

export default EnhancedTableToolbar2;