import {IFile} from "./File/IFile";

export interface ISavable<T> {
    save(file:IFile, fileName:string): void;
    load(file:IFile): T;
}
