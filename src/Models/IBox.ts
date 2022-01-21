import { ICell } from "./ICell";

export interface IBox {
    cellAt(x: number, y: number): ICell;
    getWrongCells(): ICell[];
    getCells(): ICell[];
}