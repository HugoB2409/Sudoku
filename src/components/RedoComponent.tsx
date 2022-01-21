import React from "react";


interface RedoProps {
    redoButton:boolean;
    redoGrid():void;
}

const RedoComponent: React.FC<RedoProps> = ({
    redoButton,
    redoGrid
}) => {

    return (
        <button className={`${redoButton ? `bounce-right`:``} m-2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-4 px-4 border border-black shadow-offset-black active:shadow-none`}
                onClick={() => {
                    redoGrid();
                }}>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 9l3 3m0 0l-3 3m3-3H8m13 0a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
        </button>
    );
};
export default RedoComponent;