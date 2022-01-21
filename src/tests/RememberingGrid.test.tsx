import '@testing-library/jest-dom';
import {IGrid} from "../Models/IGrid";
import {Cell} from "../Models/Cell";
import {ICell} from "../Models/ICell";
import {RememberingGridFactory} from "../Models/Factory/RememberingGridFactory";
import {FileMock} from "../Models/File/FileMock";

test('TestUndo', () => {
    let rememberingGrid = gridMaker();
    let oldCell = rememberingGrid.cellAt(0, 0);
    let newCell = [new Cell("2", oldCell.getCenterComment(), oldCell.getCornerComments(), oldCell.getColor(), oldCell.getId())];

    rememberingGrid = rememberingGrid.update(newCell);
    rememberingGrid = prettyUndo(rememberingGrid);

    expect(rememberingGrid.cellAt(0, 0).getValue()).toBe(oldCell.getValue());
});

test('TestCompleteCellUndo', () => {
    let rememberingGrid = gridMaker();
    let oldCell = rememberingGrid.cellAt(0, 0);
    let newCell = [new Cell("2", "12", ['', '', '', ''], oldCell.getColor(), oldCell.getId())];

    rememberingGrid = rememberingGrid.update(newCell);
    rememberingGrid = prettyUndo(rememberingGrid);

    expect(rememberingGrid.cellAt(0, 0).getValue()).toStrictEqual(oldCell.getValue());
});

test('TestRedo', () => {
    let rememberingGrid = gridMaker();
    let oldCell = rememberingGrid.cellAt(0, 0);
    let newCell = new Cell('3', oldCell.getCenterComment(), oldCell.getCornerComments(), oldCell.getColor(), oldCell.getId());

    rememberingGrid = rememberingGrid.update([newCell]);
    rememberingGrid = prettyUndo(rememberingGrid);
    rememberingGrid = prettyRedo(rememberingGrid);

    expect(rememberingGrid.cellAt(0, 0).getValue()).toBe(newCell.getValue());
});

test('TestMultipleUndo', () => {
    let rememberingGrid = gridMaker();
    let oldCell = rememberingGrid.cellAt(0, 0);

    rememberingGrid = updateGrid(rememberingGrid, oldCell);
    rememberingGrid = prettyUndo(rememberingGrid);
    rememberingGrid = prettyUndo(rememberingGrid);
    rememberingGrid = prettyUndo(rememberingGrid);
    rememberingGrid = prettyUndo(rememberingGrid);

    expect(rememberingGrid.cellAt(0, 0).getValue()).toBe(oldCell.getValue());
});

test('TestMultipleRedo', () => {
    let rememberingGrid = gridMaker();
    let oldCell = rememberingGrid.cellAt(0, 0);

    rememberingGrid = updateGrid(rememberingGrid, oldCell);
    let newCell = rememberingGrid.cellAt(0, 0);
    rememberingGrid = prettyUndo(rememberingGrid);
    rememberingGrid = prettyRedo(rememberingGrid);
    rememberingGrid = prettyUndo(rememberingGrid);
    rememberingGrid = prettyUndo(rememberingGrid);
    rememberingGrid = prettyUndo(rememberingGrid);
    rememberingGrid = prettyRedo(rememberingGrid);
    rememberingGrid = prettyRedo(rememberingGrid);
    rememberingGrid = prettyRedo(rememberingGrid);

    expect(rememberingGrid.cellAt(0, 0).getValue()).toBe(newCell.getValue());
});

test('TestMixRedoUndo', () => {
    let rememberingGrid = gridMaker();
    let oldCell = rememberingGrid.cellAt(3, 3);
    let newCell = [new Cell("2", oldCell.getCenterComment(), oldCell.getCornerComments(), oldCell.getColor(), oldCell.getId())];
    rememberingGrid = rememberingGrid.update(newCell);
    newCell = [new Cell("5", oldCell.getCenterComment(), oldCell.getCornerComments(), oldCell.getColor(), oldCell.getId())];
    rememberingGrid = rememberingGrid.update(newCell);
    let cell = rememberingGrid.cellAt(3, 3);
    rememberingGrid = prettyUndo(rememberingGrid);
    rememberingGrid = prettyRedo(rememberingGrid);
    newCell = [new Cell("3", oldCell.getCenterComment(), oldCell.getCornerComments(), oldCell.getColor(), oldCell.getId())];
    rememberingGrid = rememberingGrid.update(newCell);
    rememberingGrid = prettyUndo(rememberingGrid);

    expect(rememberingGrid.cellAt(3, 3).getValue()).toBe(cell.getValue());
});

test('LoadUndoTest', () => {
    let rememberingGrid = gridMaker();
    let oldCell = rememberingGrid.cellAt(3, 3);
    let newCell = [new Cell("2", oldCell.getCenterComment(), oldCell.getCornerComments(), oldCell.getColor(), oldCell.getId())];
    rememberingGrid = rememberingGrid.update(newCell);
    let file = new FileMock();
    rememberingGrid = rememberingGrid.load(file);
    let resp = rememberingGrid.undo();
    expect(resp).toBe(null);
});


function gridMaker(fileContent?: string): IGrid {
    if (fileContent === undefined) {
        fileContent = "{\"boxes\":[{\"cells\":[{\"value\":1,\"centerComment\":\"\",\"cornerComments\":[\"\"]},{\"value\":2,\"centerComment\":\"\",\"cornerComments\":[\"\"]},{\"value\":3,\"centerComment\":\"\",\"cornerComments\":[\"\"]},{\"value\":2,\"centerComment\":\"\",\"cornerComments\":[\"\"]},{\"value\":3,\"centerComment\":\"\",\"cornerComments\":[\"\"]},{\"value\":4,\"centerComment\":\"\",\"cornerComments\":[\"\"]},{\"value\":3,\"centerComment\":\"\",\"cornerComments\":[\"\"]},{\"value\":4,\"centerComment\":\"\",\"cornerComments\":[\"\"]},{\"value\":5,\"centerComment\":\"\",\"cornerComments\":[\"\"]}]},{\"cells\":[{\"value\":4,\"centerComment\":\"\",\"cornerComments\":[\"\"]},{\"value\":5,\"centerComment\":\"\",\"cornerComments\":[\"\"]},{\"value\":6,\"centerComment\":\"\",\"cornerComments\":[\"\"]},{\"value\":5,\"centerComment\":\"\",\"cornerComments\":[\"\"]},{\"value\":6,\"centerComment\":\"\",\"cornerComments\":[\"\"]},{\"value\":7,\"centerComment\":\"\",\"cornerComments\":[\"\"]},{\"value\":6,\"centerComment\":\"\",\"cornerComments\":[\"\"]},{\"value\":7,\"centerComment\":\"\",\"cornerComments\":[\"\"]},{\"value\":8,\"centerComment\":\"\",\"cornerComments\":[\"\"]}]},{\"cells\":[{\"value\":7,\"centerComment\":\"\",\"cornerComments\":[\"\"]},{\"value\":8,\"centerComment\":\"\",\"cornerComments\":[\"\"]},{\"value\":9,\"centerComment\":\"\",\"cornerComments\":[\"\"]},{\"value\":8,\"centerComment\":\"\",\"cornerComments\":[\"\"]},{\"value\":9,\"centerComment\":\"\",\"cornerComments\":[\"\"]},{\"value\":1,\"centerComment\":\"\",\"cornerComments\":[\"\"]},{\"value\":9,\"centerComment\":\"\",\"cornerComments\":[\"\"]},{\"value\":1,\"centerComment\":\"\",\"cornerComments\":[\"\"]},{\"value\":2,\"centerComment\":\"\",\"cornerComments\":[\"\"]}]},{\"cells\":[{\"value\":4,\"centerComment\":\"\",\"cornerComments\":[\"\"]},{\"value\":5,\"centerComment\":\"\",\"cornerComments\":[\"\"]},{\"value\":6,\"centerComment\":\"\",\"cornerComments\":[\"\"]},{\"value\":5,\"centerComment\":\"\",\"cornerComments\":[\"\"]},{\"value\":6,\"centerComment\":\"\",\"cornerComments\":[\"\"]},{\"value\":7,\"centerComment\":\"\",\"cornerComments\":[\"\"]},{\"value\":6,\"centerComment\":\"\",\"cornerComments\":[\"\"]},{\"value\":7,\"centerComment\":\"\",\"cornerComments\":[\"\"]},{\"value\":8,\"centerComment\":\"\",\"cornerComments\":[\"\"]}]},{\"cells\":[{\"value\":7,\"centerComment\":\"\",\"cornerComments\":[\"\"]},{\"value\":8,\"centerComment\":\"\",\"cornerComments\":[\"\"]},{\"value\":9,\"centerComment\":\"\",\"cornerComments\":[\"\"]},{\"value\":8,\"centerComment\":\"\",\"cornerComments\":[\"\"]},{\"value\":9,\"centerComment\":\"\",\"cornerComments\":[\"\"]},{\"value\":1,\"centerComment\":\"\",\"cornerComments\":[\"\"]},{\"value\":9,\"centerComment\":\"\",\"cornerComments\":[\"\"]},{\"value\":1,\"centerComment\":\"\",\"cornerComments\":[\"\"]},{\"value\":2,\"centerComment\":\"\",\"cornerComments\":[\"\"]}]},{\"cells\":[{\"value\":1,\"centerComment\":\"\",\"cornerComments\":[\"\"]},{\"value\":2,\"centerComment\":\"\",\"cornerComments\":[\"\"]},{\"value\":3,\"centerComment\":\"\",\"cornerComments\":[\"\"]},{\"value\":2,\"centerComment\":\"\",\"cornerComments\":[\"\"]},{\"value\":3,\"centerComment\":\"\",\"cornerComments\":[\"\"]},{\"value\":4,\"centerComment\":\"\",\"cornerComments\":[\"\"]},{\"value\":3,\"centerComment\":\"\",\"cornerComments\":[\"\"]},{\"value\":4,\"centerComment\":\"\",\"cornerComments\":[\"\"]},{\"value\":5,\"centerComment\":\"\",\"cornerComments\":[\"\"]}]},{\"cells\":[{\"value\":7,\"centerComment\":\"\",\"cornerComments\":[\"\"]},{\"value\":8,\"centerComment\":\"\",\"cornerComments\":[\"\"]},{\"value\":9,\"centerComment\":\"\",\"cornerComments\":[\"\"]},{\"value\":8,\"centerComment\":\"\",\"cornerComments\":[\"\"]},{\"value\":9,\"centerComment\":\"\",\"cornerComments\":[\"\"]},{\"value\":1,\"centerComment\":\"\",\"cornerComments\":[\"\"]},{\"value\":9,\"centerComment\":\"\",\"cornerComments\":[\"\"]},{\"value\":1,\"centerComment\":\"\",\"cornerComments\":[\"\"]},{\"value\":2,\"centerComment\":\"\",\"cornerComments\":[\"\"]}]},{\"cells\":[{\"value\":1,\"centerComment\":\"\",\"cornerComments\":[\"\"]},{\"value\":2,\"centerComment\":\"\",\"cornerComments\":[\"\"]},{\"value\":3,\"centerComment\":\"\",\"cornerComments\":[\"\"]},{\"value\":2,\"centerComment\":\"\",\"cornerComments\":[\"\"]},{\"value\":3,\"centerComment\":\"\",\"cornerComments\":[\"\"]},{\"value\":4,\"centerComment\":\"\",\"cornerComments\":[\"\"]},{\"value\":3,\"centerComment\":\"\",\"cornerComments\":[\"\"]},{\"value\":4,\"centerComment\":\"\",\"cornerComments\":[\"\"]},{\"value\":5,\"centerComment\":\"\",\"cornerComments\":[\"\"]}]},{\"cells\":[{\"value\":4,\"centerComment\":\"\",\"cornerComments\":[\"\"]},{\"value\":5,\"centerComment\":\"\",\"cornerComments\":[\"\"]},{\"value\":6,\"centerComment\":\"\",\"cornerComments\":[\"\"]},{\"value\":5,\"centerComment\":\"\",\"cornerComments\":[\"\"]},{\"value\":6,\"centerComment\":\"\",\"cornerComments\":[\"\"]},{\"value\":7,\"centerComment\":\"\",\"cornerComments\":[\"\"]},{\"value\":6,\"centerComment\":\"\",\"cornerComments\":[\"\"]},{\"value\":7,\"centerComment\":\"\",\"cornerComments\":[\"\"]},{\"value\":8,\"centerComment\":\"\",\"cornerComments\":[\"\"]}]}]}";
    }
    return new RememberingGridFactory().createGrid(fileContent);
}

function updateGrid(rememberingGrid: IGrid, oldCell: ICell) {
    let newCell = new Cell('2', oldCell.getCenterComment(), oldCell.getCornerComments(), oldCell.getColor(), oldCell.getId());
    rememberingGrid = rememberingGrid.update([newCell]);
    newCell = new Cell('3', oldCell.getCenterComment(), oldCell.getCornerComments(), oldCell.getColor(), oldCell.getId());
    rememberingGrid = rememberingGrid.update([newCell]);
    newCell = new Cell('4', oldCell.getCenterComment(), oldCell.getCornerComments(), oldCell.getColor(), oldCell.getId());
    rememberingGrid = rememberingGrid.update([newCell]);
    newCell = new Cell('5', oldCell.getCenterComment(), oldCell.getCornerComments(), oldCell.getColor(), oldCell.getId());
    rememberingGrid = rememberingGrid.update([newCell]);
    return rememberingGrid;
}

function prettyUndo(grid: IGrid): IGrid {
    let resp = grid.undo();
    if (resp !== null) {
        return resp;
    }
    throw new Error("Undo shouldnt be Null in this case: TestWrong");
    return grid;
}

function prettyRedo(grid: IGrid) {
    let resp = grid.redo();
    if (resp !== null) {
        return resp;
    }
    throw new Error("Redo shouldnt be Null in this case: TestWrong");
    return grid;
}