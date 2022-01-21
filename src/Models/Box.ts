import { ICell } from "./ICell";
import { Cell } from "./Cell";
import { IBox } from "./IBox";

export class Box implements IBox{

    private readonly cells: ICell[]

    constructor(cells: ICell[]) {
        this.cells = cells;
    }

    public cellAt(x: number, y: number): ICell {
        return this.cells[3 * y + x];
    }

    public getWrongCells(): ICell[] {
        let wrongCells = new Set<ICell>();
        let map = new Map<string, ICell>();
        this.cells.forEach(function(cell) {
            if (map.has(cell.getValue())) {
                wrongCells.add(cell);
                let cell2 = map.get(cell.getValue());
                if (cell2 instanceof Cell) {
                    wrongCells.add(cell2);
                }
            } else if (cell.getValue() !== "") {
                map.set(cell.getValue(), cell);
            }
        })
        return Array.from(wrongCells.values());
    }

    public getCells(): ICell[] {
        return this.cells;
    }
}