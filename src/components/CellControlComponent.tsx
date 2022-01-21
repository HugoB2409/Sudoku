import { Cell } from "../Models/Cell";
import { useState, useEffect } from "react";
import ColorPickerComponent from "./ColorPickerComponent";
import { File } from "../Models/File/File";
import React from "react";
import { ICell } from "../Models/ICell";

interface CellProps {
  selectedCell: ICell[];
  setModal(): void;
  onSaveCell(cell: ICell[]): void;
  onDeleteCell(): void;
}

const CellControlComponent: React.FC<CellProps> = ({
  selectedCell,
  onSaveCell,
  onDeleteCell,
}) => {
  const [value, setValue] = useState("");
  const [centerComment, setCenterComment] = useState("");
  const [cornerComment, setCornerComment] = useState(["", "", "", ""]);
  const [color, setColor] = useState("");

  useEffect(() => {
    if (selectedCell.length !== 0) {
      setValue(selectedCell[0].getValue());
      setCenterComment(selectedCell[0].getCenterComment());
      setCornerComment(selectedCell[0].getCornerComments());
      setColor(selectedCell[0].getColor());
    }
  }, [selectedCell]);

  const handleSave = () => {
    // update all selected cells
    var newCells = selectedCell.map((cell) => {
      return new Cell(value, centerComment, cornerComment, color, cell.getId());
    });
    onSaveCell(newCells);
    setValue("");
    setCenterComment("");
    setCornerComment(["", "", "", ""]);
  };

  const handleKeyPress = () => {
    onSaveCell([
      new Cell(value, centerComment, cornerComment, color, selectedCell[0].getId()),
    ]);
    setValue("");
    setCenterComment("");
    setCornerComment(["", "", "", ""]);
  };

  const updateCornerComment = (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    let newArr = [...cornerComment];
    newArr[index] = e.target.value;
    setCornerComment(newArr);
  };

  const updateSelectedCellColor = (color:string) => {
    setColor(color);
  };

  return (
    <div className="">
      {selectedCell.length === 0 ? (
        <div
          className={`border border-black shadow-offset-black row-span-2 place-items-center p-8 text-black`}
        >
          Please select a cell.
        </div>
      ) : (
        <div
          className={`border border-black shadow-offset-black row-span-2 place-items-center p-8`}
        >
          <div>
            <h1 className="text-center p-2 text-black">Selected Cell</h1>
          </div>
          <div className="grid grid-cols-2">
            <div className="col-span-2 my-4 grid grid-cols-1 place-items-center">
              <div className="grid grid-cols-2">
                <div className="m-2 justify-center items-center">
                  <label className="block text-gray-600 font-bold text-sm mb-2">
                    TL-Comment
                  </label>
                  <input
                    type="text"
                    pattern="^[1-9]*$"
                    maxLength={1}
                    value={cornerComment[0]}
                    onKeyPress={(e) => e.key === "Enter" && handleKeyPress()}
                    onChange={(e) => updateCornerComment(e, 0)}
                    className="w-24 h-10 text-black text-center border border-gray-500"
                  />
                </div>
                <div className="m-2 justify-center items-center">
                  <label className="block text-gray-600 text-sm font-bold mb-2">
                    TR-Comment
                  </label>
                  <input
                    type="text"
                    pattern="^[1-9]*$"
                    maxLength={1}
                    value={cornerComment[1]}
                    onKeyPress={(e) => e.key === "Enter" && handleKeyPress()}
                    onChange={(e) => updateCornerComment(e, 1)}
                    className="w-24 h-10 text-black text-center border border-gray-500"
                  />
                </div>
              </div>
              <div className="grid grid-cols-2">
                <div className="m-2 justify-center items-center">
                  <label className="block text-gray-600 text-sm font-bold mb-2 text-center">
                    Value
                  </label>
                  <input
                    type="text"
                    pattern="^[1-9]*$"
                    maxLength={1}
                    value={value}
                    onKeyPress={(e) => e.key === "Enter" && handleKeyPress()}
                    onChange={(e) => setValue(e.target.value)}
                    className="h-10 w-24 text-black text-center border border-gray-500"
                  />
                </div>
                <div className="m-2 justify-center items-center">
                  <label className="block text-gray-600 text-sm font-bold mb-2 text-center">
                    Center
                  </label>
                  <input
                    type="text"
                    pattern="^[1-9]*$"
                    maxLength={9}
                    value={centerComment}
                    onKeyPress={(e) => e.key === "Enter" && handleKeyPress()}
                    onChange={(e) => setCenterComment(e.target.value)}
                    className="h-10 w-24 text-black text-center border border-gray-500"
                  />
                </div>
              </div>
              <div className="grid grid-cols-2">
                <div className="m-2 justify-center items-center">
                  <label className="block text-gray-600 text-sm font-bold mb-2">
                    BL-Comment
                  </label>
                  <input
                    type="text"
                    pattern="^[1-9]*$"
                    maxLength={1}
                    value={cornerComment[2]}
                    onKeyPress={(e) => e.key === "Enter" && handleKeyPress()}
                    onChange={(e) => updateCornerComment(e, 2)}
                    className="w-24 h-10 text-black text-center border border-gray-500"
                  />
                </div>
                <div className="m-2 justify-center items-center">
                  <label className="block text-gray-600 text-sm font-bold mb-2">
                    BR-Comment
                  </label>
                  <input
                    type="text"
                    pattern="^[1-9]*$"
                    maxLength={1}
                    value={cornerComment[3]}
                    onKeyPress={(e) => e.key === "Enter" && handleKeyPress()}
                    onChange={(e) => updateCornerComment(e, 3)}
                    className="w-24 h-10 text-black text-center border border-gray-500"
                  />
                </div>
              </div>
              <ColorPickerComponent
                selectedCell={selectedCell}
                updateColor={updateSelectedCellColor}
              />
            </div>
            <button
              onClick={handleSave}
              className="m-2 bg-lime-400 text-black border border-black hover:bg-lime-500 text-white font-bold py-4 px-4 shadow-offset-black active:shadow-none"
            >
              Save Cell
            </button>
            <button
              onClick={onDeleteCell}
              className="m-2 bg-red-500 text-black border border-black hover:bg-red-600 text-white font-bold py-4 px-4 shadow-offset-black active:shadow-none"
            >
              Delete Cell
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CellControlComponent;
