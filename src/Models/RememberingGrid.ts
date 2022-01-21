import { IFile } from "./File/IFile";
import { IGrid } from "./IGrid";
import { IBox } from "./IBox";
import { ICell } from "./ICell";
import { Stack } from "./Stack";

export class RememberingGrid implements IGrid {
    private readonly grid: IGrid;
    private readonly undid: Stack<IGrid>;
    private readonly history: Stack<IGrid>;

    constructor(grid: IGrid, undid: Stack<IGrid> = new Stack<IGrid>(), history: Stack<IGrid> = new Stack<IGrid>()) {
        this.grid = grid;
        this.undid = undid;
        this.history = history;
    }

    cellAt(x: number, y: number): ICell {
        return this.grid.cellAt(x, y);
    }

    getBoxes(): IBox[] {
        return this.grid.getBoxes();
    }

    getWrongCells(): ICell[] {
        return this.grid.getWrongCells();
    }

    checkBoxes(): ICell[] {
        return this.grid.checkBoxes();
    }

    checkColumns(): ICell[] {
        return this.grid.checkColumns();
    }

    checkRows(): ICell[] {
        return this.grid.checkRows();
    }

    update(newCell: ICell[]): IGrid {
        const newGrid = this.grid.update(newCell);
        const newHistory = this.history.push(this.grid);
        return new RememberingGrid(newGrid, undefined, newHistory);
    }

    reset(): IGrid {
        return new RememberingGrid(this.grid.reset());
    }

    undo(): IGrid | null {
        const [lastGrid, newHistory] = this.history.pop();
        const newUndid = this.undid.push(this.grid);
        if (lastGrid !== null) {
            return new RememberingGrid(lastGrid, newUndid, newHistory!);
        }
        return null;
    }

    redo(): IGrid | null {
        const [undidGrid, newUndid] = this.undid.pop();
        const newHistory = this.history.push(this.grid);
        if (undidGrid !== null) {
            return new RememberingGrid(undidGrid, newUndid!, newHistory);
        }
        return null;
    }

    load(file: IFile): IGrid {
        return new RememberingGrid(this.grid.load(file), undefined, undefined);
    }

    save(file: IFile): void {
        this.grid.save(file);
    }

    getGrid(): IGrid {
        return this.grid;
    }

}
