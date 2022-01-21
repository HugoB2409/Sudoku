import React, { useState } from "react";
import { Cell } from "../Models/Cell";
import { ICell } from "../Models/ICell";
import GridComponent from "../components/GridComponent";
import CellControlComponent from "../components/CellControlComponent";
import SaveGameModal from "../components/SaveGameModal";
import { File } from "../Models/File/File";
import {RememberingGridFactory} from "../Models/Factory/RememberingGridFactory";
import RedoComponent from "../components/RedoComponent";
import UndoComponent from "../components/UndoComponent";
import MultiSelectComponent from "../components/MultiSelectComponent";
import LoadButton from "../components/LoadButtonComponent";

function App() {
  const [grid, setGrid] = useState(gridBase);
  const [wrongCells, setWrongCells] = useState(t);
  const [selectedCell, setSelectedCell] = useState<ICell[]>([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [multiSelect, setMultiSelect] = useState(false);
  const [undoButton, setUndoButton] = useState(false);
  const [redoButton, setRedoButton] = useState(false);
  const [wrongText, setWrongText] = useState(false);

  const onClick = (cell: Cell) => {
    if (multiSelect) {
      setSelectedCell([...selectedCell, cell]);
    } else {
      setSelectedCell([cell]);
    }
  };

  const updateMultiSelect = (multiSelect:boolean) => {
    setMultiSelect(multiSelect);
  }

  const onNewGame = () => {
    const newGrid = new RememberingGridFactory().createGrid();
    setGrid(newGrid);
    setSelectedCell([]);
  };

  const onLoadGame = (gameFile: File) => {
    const newGrid = grid.load(gameFile);
    setWrongCells(newGrid.getWrongCells());
    setGrid(newGrid);
  };

  const setModal = () => {
    setModalOpen(!modalOpen);
  };

  const onSaveGame = () => {
    grid.save(
      new File(
        JSON.stringify(grid, (key, value) => (key === "id" ? undefined : value))
      )
    );
  };

  const onSaveCell = (newCell: ICell[]) => {
    const newGrid = grid.update(newCell);
    setGrid(newGrid);
    setWrongCells(newGrid.getWrongCells());
    // if (newGrid.getWrongCells().length > 0) {
    //   setWrongText(true);
    //   setTimeout(() => {
    //     setWrongText(false);
    //   },800);
    // }
    setSelectedCell([]);
  };

  const onDeleteCell = () => {
    let cells: ICell[] = []
    selectedCell.forEach((value, index, array) => {
      cells.push(new Cell("", "", ["", "", "", ""], "bg-gray-50", selectedCell[index].getId()));
    });
    const newGrid = grid.update(cells);
    setGrid(newGrid);
    setWrongCells(newGrid.getWrongCells());
    setSelectedCell([]);
  };

  const undoGrid = () => {
    const lastGrid = grid.undo();
    if (lastGrid !== null) {
      setGrid(lastGrid);
      setWrongCells(lastGrid.getWrongCells());
      setSelectedCell([]);
    } else {
      setUndoButton(true);
      setTimeout(() => {
        setUndoButton(false);
      },300);
    }
  }

  const redoGrid = () => {
    const futureGrid = grid.redo();
    if (futureGrid !== null) {
      setGrid(futureGrid);
      setWrongCells(futureGrid.getWrongCells());
      setSelectedCell([]);
    } else {
      setRedoButton(true);
      setTimeout(() => {
        setRedoButton(false);
      },300);
    }
  }

  return (
    <div className="bg-gray-100">
      <div className="z-50">
        {modalOpen && (
          <SaveGameModal setModal={setModal} onSaveGame={onSaveGame} />
        )}
      </div>

      <div  className={`absolute text-9xl text-red-600 left-80 top-80 z-40 ${wrongText ? 'animate-ping ' : 'hidden' }`}>
        WRONG!
      </div>

      <div className="grid md:grid-cols-5 grid-cols-1 h-screen">
        <div className="col-span-3 m-auto shadow-sudoku-offset-black">
          <GridComponent
            grid={grid.getGrid()}
            onClick={onClick}
            selectedCell={selectedCell}
            wrongCells={wrongCells}
          />
        </div>

        <div className="col-span-2 text-black grid grid-cols-4">
          <div className="sudokuTitle text-center text-7xl mb-14 mt-14">
            <div className="">
              <span className="text-transparent bg-lime-300 left-1/2 -ml-3 bottom-2.5 text-4xl lol mt-4">une quand meme de tres longue ligne</span>
              <h1 className="transform rotate-180">Sudoku Solver Tool</h1>
            </div>
          </div>
          <div className="m-auto col-span-3">
            <div className="grid grid-cols-3 text-black mb-16 gap-y-10">
              <div className="grid grid-col-1 place-items-center">
                <button
                    onClick={onNewGame}
                    className="m-2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-4 px-4 border border-black shadow-offset-black active:shadow-none">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </button>
                <div>New</div>
              </div>
              <div className="grid grid-col-1 place-items-center">
                <LoadButton onLoadGame={onLoadGame} />
                <div>Load</div>
              </div>
              <div className="grid grid-col-1 place-items-center">
                <button
                    onClick={setModal}
                    className="m-2 bg-green-500 hover:bg-green-700 text-white font-bold py-4 px-4 border border-black shadow-offset-black active:shadow-none"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                  </svg>
                </button>
                <div>Save</div>
              </div>
              <div className="grid grid-col-1 place-items-center">
                <MultiSelectComponent
                    multiSelect={multiSelect}
                    updateMultiSelect={updateMultiSelect}
                />
                <div>Multi Mode</div>
              </div>
              <div className="grid grid-col-1 place-items-center">
                <UndoComponent
                    undoButton={undoButton}
                    undoGrid={undoGrid}
                />
                <div>Undo</div>
              </div>
              <div className="grid grid-col-1 place-items-center">
                <RedoComponent
                    redoButton={redoButton}
                    redoGrid={redoGrid}
                />
                <div>Redo</div>
              </div>
            </div>
            <div className="bg-gray-200 shadow-lg border border-gray-300 text-center">
              <CellControlComponent
                  selectedCell={selectedCell}
                  setModal={setModal}
                  onSaveCell={onSaveCell}
                  onDeleteCell={onDeleteCell}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;

let t: ICell[];
t = [];
const gridBase = new RememberingGridFactory().createGrid();