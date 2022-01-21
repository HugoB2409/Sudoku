import CellComponent from "./CellComponent";
import { IBox } from "../Models/IBox";
import { ICell } from "../Models/ICell";

interface BoxProps {
  box: IBox;
  wrongCells: ICell[];
  onClick(cell: ICell): void;
  selectedCell: ICell[];
}

const BoxComponent: React.FC<BoxProps> = ({
  box,
  onClick,
  selectedCell,
  wrongCells,
}) => {
  return (
    <div className="grid grid-cols-3 border border-black">
      {box.getCells().map((cell: ICell) => {
        return (
          <CellComponent
            cell={cell}
            onClick={onClick}
            selectedCell={selectedCell}
            wrongCells={wrongCells}
          />
        );
      })}
    </div>
  );
};

export default BoxComponent;
