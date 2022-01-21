export interface ICell {
    getId(): number;
    getValue(): string;
    getCenterComment(): string;
    getCornerComments(): string[];
    getColor(): string;
    setColor(color:string):void;
}