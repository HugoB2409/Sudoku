import { IFile } from "./File/IFile";
import { IBox } from "./IBox";
import { ICell } from "./ICell";
import { ISavable } from "./ISavable";
import {IUndoRedo} from "./IUndoRedo";

export interface IGrid extends ISavable<IGrid>, IUndoRedo<IGrid> {
    cellAt(x: number, y: number): ICell;
    getBoxes(): IBox[];
    getWrongCells(): ICell[];
    checkBoxes(): ICell[];
    checkColumns(): ICell[];
    checkRows(): ICell[];
    update(newCell: ICell[]): IGrid;
    reset(): IGrid;
    load(file: IFile): IGrid;
    save(file: IFile): void;
    getGrid(): IGrid;
}
