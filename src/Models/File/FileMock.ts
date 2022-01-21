import { IFile } from "./IFile";
import { json } from "./testFile";

export class FileMock implements IFile {
    private _writeContent: string;

    constructor() {
        this._writeContent = json;
    }

    read(): string {
        return this._writeContent;
    }

    write(content: string): void {
        this._writeContent = content;
    }

    get writeContent(): string {
        return this._writeContent;
    }
}
