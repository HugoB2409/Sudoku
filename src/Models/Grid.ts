import { ISavable } from "./ISavable";
import { IFile } from "./File/IFile";
import { IBox } from "./IBox";
import { Box } from "./Box";
import { ICell } from "./ICell";
import { Cell } from "./Cell";
import { IGrid } from "./IGrid";

export class Grid implements IGrid {
  private readonly boxes: IBox[];

  constructor(boxes: IBox[]) {
    this.boxes = boxes;
  }

  //TODO: test this function
  cellAt(x: number, y: number): ICell {
    return this.boxes[3 * Math.floor(y / 3) + Math.floor(x / 3)].cellAt(
      x % 3,
      y % 3
    );
  }

  getBoxes(): IBox[] {
    return this.boxes;
  }

  getWrongCells(): ICell[] {
    let wrongCells = this.checkBoxes()
      .concat(this.checkColumns())
      .concat(this.checkRows());
    let dictionary = new Map<number, ICell>();
    wrongCells.forEach(function (cell) {
      dictionary.set(cell.getId(), cell);
    });
    return Array.from(dictionary.values());
  }

  checkBoxes(): ICell[] {
    let wrongCells: ICell[] = [];
    this.boxes.forEach(function (box) {
      wrongCells = wrongCells.concat(box.getWrongCells());
    });
    return wrongCells;
  }

  checkColumns(): ICell[] {
    let colWrongCells = new Set<ICell>();
    let dictionary = new Map<string, ICell>();

    for (let x = 0; x < 9; x++) {
      dictionary.clear();
      for (let y = 0; y < 9; y++) {
        let cell = this.cellAt(x, y);
        if (dictionary.has(cell.getValue())) {
          colWrongCells.add(cell);
          let c = dictionary.get(cell.getValue());
          if (c instanceof Cell) colWrongCells.add(c);
        } else if (cell.getValue() !== "") {
          dictionary.set(cell.getValue(), cell);
        }
      }
    }
    return Array.from(colWrongCells.values());
  }

  checkRows(): ICell[] {
    let rowWrongCells = new Set<ICell>();
    let dictionary = new Map<string, ICell>();

    for (let y = 0; y < 9; y++) {
      dictionary.clear();
      for (let x = 0; x < 9; x++) {
        let cell = this.cellAt(x, y);
        if (dictionary.has(cell.getValue())) {
          rowWrongCells.add(cell);
          let c = dictionary.get(cell.getValue());
          if (c instanceof Cell) rowWrongCells.add(c);
        } else if (cell.getValue() !== "") {
          dictionary.set(cell.getValue(), cell);
        }
      }
    }
    return Array.from(rowWrongCells.values());
  }

  public update(newCell: ICell[]): Grid {
    let boxes = this.boxes;
    let newBoxes: IBox[] = [];
    boxes.forEach((box) => {
      let newCells: ICell[] = [];
      let cells = box.getCells();
      cells.forEach((cell) => {
        let index = newCell.findIndex(c => c.getId() === cell.getId());
        if (index !== -1) {
          newCells.push(newCell[index])
        } else {
          newCells.push(cell);
        }
      })
      newBoxes.push(new Box(newCells));

    });

    return new Grid(newBoxes);

    // var index = 0;
    // let pos: any = [];
    // var newGrid = this;
    //
    // this.boxes.forEach((box, i) => {
    //   box.getCells().forEach((cell, j) => {
    //     if (newCell.some((c) => c.getId() === cell.getId())) {
    //       pos[index] = { boxId: i, cellId: j };
    //       index++;
    //     }
    //   });
    // });
    //
    // pos.forEach((p: any, q: any) => {
    //   newGrid.boxes[p.boxId].getCells()[p.cellId] = newCell[q];
    // });
    //
    // return newGrid;
  }

  public reset(): Grid {
    var emptyCells: ICell[] = [];
    var emptyBoxes: IBox[] = [];

    for (var i = 0; i < 9; i++) {
      for (var j = 0; j < 9; j++) {
        emptyCells.push(new Cell("", "", [""]));
      }
      emptyBoxes.push(new Box(emptyCells));
      emptyCells = [];
    }

    return new Grid(emptyBoxes);
  }

  load(file: IFile): Grid {
    const json = JSON.parse(file.read());

    var boxes: IBox[] = [];
    json.boxes.forEach((box: any) => {
      let cells: ICell[] = [];
      box.cells.forEach((cell: any) => {
        cells.push(
          new Cell(cell.value, cell.centerComment, cell.cornerComments, cell.color)
        );
      });
      boxes.push(new Box(cells));
    });

    return new Grid(boxes);
  }

  save(file: IFile): void {
    file.write(
      JSON.stringify(this, (key, value) => (key === "id" ? undefined : value))
    );
  }

  getGrid(): IGrid {
    return this;
  }

  redo(): IGrid | null {
    return this;
  }

  undo(): IGrid | null {
    return this;
  }
}
