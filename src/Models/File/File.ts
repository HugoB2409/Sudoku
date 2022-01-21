import { IFile } from "./IFile";

export class File implements IFile {
    private readonly content: string;

    constructor(content: string) {
        this.content = content;
    }

    read(): string {
        return this.content;
    }

    write(content: string): void {
        const blob = new Blob([content], {type: "application/json"});
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.download = 'sudoku.json';
        link.href = url;
        link.click();
    }

}
