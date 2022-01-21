import { ICell } from "../Models/ICell";

interface CellProps {
  cell: ICell;
  wrongCells: ICell[];
  selectedCell: ICell[];
  onClick(cell: ICell): void;
}

const CellComponent: React.FC<CellProps> = ({
  cell,
  wrongCells,
  selectedCell,
  onClick,
}) => {
  const onCellClick = () => {
    onClick(cell);
  };

  return (
    <div
      className={`h-24 w-24 cursor-pointer border border-black ${cell.getColor()}  ${
        selectedCell?.some((c) => c.getId() === cell.getId())
          ? "border-4 border-blue-400"
          : "hover:border-2 hover:border-blue-400"
      }
      }
      ${
        //                            Check if cell is in wrongCells list                   Check if cell is in wrongCells list and is selected
        wrongCells.filter((c) => c.getId() === cell.getId()).length > 0
          ? cell.getId() === selectedCell[0]?.getId()
            ? "bg bg-red-500"
            : "bg bg-red-300 hover:bg-red-400 animate-pulse2 z-0"
          : "" //FIXME pierrick pwease fwix my design UwU
      }`}
      onClick={onCellClick}
    >
      <div className="grid grid-cols-1 place-items-center h-24">
        <div className="grid grid-cols-2 gap-14 mt-1 text-blue-600">
          <div className="p-0 m-0 text-sm">
            {cell.getCornerComments()[0] !== "" && cell.getCornerComments()[0]}
          </div>
          <div className="p-0 m-0 text-sm">
            {cell.getCornerComments()[1] !== "" && cell.getCornerComments()[1]}
          </div>
        </div>
        <div>
          <div className="p-0 m-0 text-xl">
            {cell.getValue() === "" ? (
              <div className="p-0 m-0 col-span-2 text-sm text-blue-600">
                {cell.getCenterComment()}
              </div>
            ) : (
              <div className="text-center text-black">
                {cell.getValue() !== "" && cell.getValue()}
              </div>
            )}
          </div>
        </div>
        <div className="grid grid-cols-2 gap-14 mb-1 text-blue-600">
          <div className="p-0 m-0 text-sm">
            {cell.getCornerComments()[2] !== "" && cell.getCornerComments()[2]}
          </div>
          <div className="p-0 m-0 text-sm">
            {cell.getCornerComments()[3] !== "" && cell.getCornerComments()[3]}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CellComponent;
