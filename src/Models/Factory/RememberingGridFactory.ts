import {GridFactory} from "./GridFactory";
import {IGrid} from "../IGrid";
import {RememberingGrid} from "../RememberingGrid";

export class RememberingGridFactory extends GridFactory{
    createGrid(gridString?: string): IGrid {
        if (gridString === undefined) {
            gridString = super.getRandomGridString();
        }
        return new RememberingGrid(super.makeGrid(gridString))
    }
}