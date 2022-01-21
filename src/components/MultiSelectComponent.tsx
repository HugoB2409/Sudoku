import React from "react";


interface MultiSelectProps {
    multiSelect:boolean;
    updateMultiSelect(multiSelect:boolean):void;
}

const MultiSelectComponent: React.FC<MultiSelectProps> = ({
    multiSelect,
    updateMultiSelect

}) => {
    return(
        <button
            className={`m-2 ${multiSelect ? "bg-yellow-600" : "bg-yellow-500 shadow-offset-black"} hover:bg-yellow-700 text-white font-bold py-4 px-4 border border-black`}
            onClick={() => {
                updateMultiSelect(!multiSelect);
            }}
        >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
            </svg>
        </button>
    );
};

export default MultiSelectComponent;