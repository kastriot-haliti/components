import { FC } from 'react';
import { FilterOptionType } from './enums/filter-option.enum';
interface Props {
    options?: FilterOptionType;
    onChange(filter: FilterOptionType): void;
}
declare const FilterOption: FC<Props>;
export default FilterOption;
