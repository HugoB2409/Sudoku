import { IBox } from "../Models/IBox";
import { ICell } from "../Models/ICell";
import BoxComponent from "./BoxComponent";
import {IGrid} from "../Models/IGrid";

interface GridProps {
  grid: IGrid;
  wrongCells: ICell[];
  selectedCell: ICell[];
  onClick(cell: ICell): void;
}

const GridComponent: React.FC<GridProps> = ({
  grid,
  wrongCells,
  selectedCell,
  onClick,
}) => {
  return (
    <div className="grid grid-cols-3">
      {grid.getBoxes().map((box: IBox, index: number) => {
        return (
          <div>
            <BoxComponent
              box={box}
              onClick={onClick}
              selectedCell={selectedCell}
              wrongCells={wrongCells}
            />
          </div>
        );
      })}
    </div>
  );
};

export default GridComponent;
