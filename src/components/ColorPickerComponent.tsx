import React, {useEffect, useState} from "react";
import {Color} from "../Models/CellColor";
import {ICell} from "../Models/ICell";

interface ColorPickerProps {
    selectedCell: ICell[];
    updateColor(color:string): void;
}

const ColorPickerComponent: React.FC<ColorPickerProps> = ({
    selectedCell,
    updateColor
}) => {
    const [color, setColor] = useState("");

    useEffect(() => {
        if (selectedCell.length !== 0) {
            setColor(selectedCell[0].getColor());
        }
    }, [selectedCell]);
    return (
        <div className="grid grid-cols-2 place-items-center">
            <div className="text-gray-600  font-bold text-sm">Color </div>
            <div className="dropdown dropdown-top dropdown-end">
                <div tabIndex={0} className={`m-1 w-12 rounded-full h-12 border-2 border-black ${color} hover:${color} hover:border-3 cursor-pointer`}/>
                <ul tabIndex={0} className="p-2 shadow menu dropdown-content bg-gray-300 bg-opacity-80 rounded-box w-52">
                    <div className="grid grid-cols-3 grid-row-3 place-items-center pt-2">
                        {
                            Object.keys(Color).map((key: any) => {
                                if(!isNaN(key)) {
                                    return (
                                        <li className={`${Color[key]} h-12 w-12 rounded-full border-2 border-black p-2 mb-2 cursor-pointer hover:border-3`}
                                            onClick={() => {
                                                setColor(Color[key]);
                                                updateColor(Color[key]);
                                            }
                                            }
                                        />
                                    )
                                } else {
                                    return null;
                                }
                            })
                        }
                    </div>
                </ul>
            </div>
        </div>
    )
};


export default ColorPickerComponent