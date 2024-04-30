export default class LinesHistory {
    undoStack: Array<StackInterface> = [];
    redoStack: Array<StackInterface> = [];
    lineCount: number = 0;

    constructor() {
        this.undoStack = [];
        this.redoStack = [];
    }

    append(line: StackInterface) {
        this.undoStack.push(line);
        this.redoStack = [];
    }

    undo() {
        if (this.undoStack.length > 0) {
            const line = this.undoStack.pop();
            if (line !== undefined) {
                this.redoStack.push(line);
            }
        }
    }

    redo() {
        if (this.redoStack.length > 0) {
            const line = this.redoStack.pop();
            if (line !== undefined) {
                this.undoStack.push(line);
            }
        }
    }

    clear() {
        this.undoStack = [];
        this.redoStack = [];
        this.lineCount = 0;
    }

    addLine() {
        this.lineCount++;
    }

    getCount() {
        return this.lineCount;
    }

    setCount(newCount: number) {
        if (newCount > 0) {
            this.lineCount = newCount;
        }
    }
}