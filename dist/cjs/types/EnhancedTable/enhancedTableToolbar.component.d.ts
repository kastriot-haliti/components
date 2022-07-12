/// <reference types="react" />
interface Props {
    title: string;
    numSelected: number;
    handleClickAdd?(): void;
    handleClickEdit?(): void;
    handleClickDelete?(): void;
    handleClickFilter?(): void;
    handleClickSettings?(): void;
}
declare const EnhancedTableToolbar: (props: Props) => JSX.Element;
export default EnhancedTableToolbar;
