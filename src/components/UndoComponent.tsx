import React from "react";


interface UndoProps {
    undoButton:boolean;
    undoGrid():void;

}

const UndoComponent: React.FC<UndoProps> = ({
    undoButton,
    undoGrid
}) => {

    return (
        <button className={`${undoButton ? `bounce-left`:``} m-2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-4 px-4 border border-black shadow-offset-black active:shadow-none`}
            onClick={undoGrid}>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 15l-3-3m0 0l3-3m-3 3h8M3 12a9 9 0 1118 0 9 9 0 01-18 0z" />
              </svg>
        </button>
    );
};
export default UndoComponent;