export class Stack<T> {
    private readonly _stack: T[];
    private readonly _count: number;

    constructor(stack: T[] = [], count: number = 0) {
        this._stack = stack;
        this._count = count;
    }

    pop(): [T | null, Stack<T> | null] {
        if (!this.isEmpty()) {
            return [
                this._stack[this._count - 1], 
                new Stack<T>(
                    this._stack.slice(0, this._count - 1), 
                    this._count - 1
                )
            ];
        }
        return [null, null];
    }

    peek(): T | null {
        return !this.isEmpty() ? this._stack[this._count - 1] : null;
    }

    push(element: T): Stack<T> {
        return new Stack<T>(this._stack.concat(element), this._count + 1);
    }

    public isEmpty(): boolean {
        return this._count === 0;
    }

    public clear(): Stack<T> {
        return new Stack<T>();
    }

}
