export interface IUndoRedo<T> {
    undo(): T | null;
    redo(): T | null;
}
