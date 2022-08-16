import * as React from 'react';
import {FC, useEffect, useState} from 'react';
import {ToggleButton, ToggleButtonGroup} from '@mui/material';
import DoneOutlineIcon from '@mui/icons-material/DoneOutline';
import CloseIcon from '@mui/icons-material/Close';
import { FilterOptionType } from './enums/filter-option.enum';

interface Props {
  options?: FilterOptionType;
  onChange(filter: FilterOptionType): void;
}

const FilterOption:FC<Props> = (props: Props) => {
  const initState = (options?: FilterOptionType) => {
    if(options === FilterOptionType.all) {
      return ['yes', 'no']
    } else if (options === FilterOptionType.yes) {
      return ['yes'];
    } else if (options === FilterOptionType.no) {
      return ['no'];
    }}

  const [options, setOptions] = React.useState(initState(props.options));
  const [filter,setFilter] = useState<FilterOptionType>(FilterOptionType.all)

  useEffect(() => {
    if(options) {
      let yes = options.find(x => x === 'yes');
      let no = options.find(x => x === 'no');
      let newFilter = filter;
      if(yes && no) {
        newFilter = FilterOptionType.all;
      }else if(yes) {
        newFilter = FilterOptionType.yes;
      }else if(no) {
        newFilter = FilterOptionType.no;
      }
      props.onChange(newFilter);
    }
  },[options])

  const handleChange = (
      event: React.MouseEvent<HTMLElement>,
      newOptions: string[],
  ) => {
    setOptions(newOptions);
  };
  return <>
    <ToggleButtonGroup
        value={options}
        onChange={handleChange}
        aria-label="text formatting"
        color = {"primary"}
    >
      <ToggleButton value={'yes'} aria-label="yes">
        <DoneOutlineIcon />
      </ToggleButton>
      <ToggleButton value={'no'} aria-label="no">
        <CloseIcon />
      </ToggleButton>
    </ToggleButtonGroup>
  </>;
}

export default FilterOption;