import {GridFactory} from "./GridFactory";
import {IGrid} from "../IGrid";

export class BaseGridFactory extends GridFactory{
    createGrid(gridString?: string): IGrid {
        if (gridString === undefined) {
            gridString = super.getRandomGridString();
        }
        return super.makeGrid(gridString);
    }
}