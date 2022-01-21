export interface IFile {
    read(): string;
    write(content:string): void;
}
