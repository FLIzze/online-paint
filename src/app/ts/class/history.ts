export default class LinesHistory {
    undoStack: Array<StackInterface> = [];
    redoStack: Array<StackInterface> = [];
    nmbPixelsInLineUndo: number[] = [];
    lineCount: number = 0;

    constructor(undoStack: Array<StackInterface>, redoStack: Array<StackInterface>, nmbPixelsInLineUndo: number[], lineCount: number) {
        this.undoStack = undoStack;
        this.redoStack = redoStack;
        this.nmbPixelsInLineUndo = nmbPixelsInLineUndo;
        this.lineCount = lineCount;
    }

    append(line: StackInterface) {
        this.undoStack.push(line);
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
    }

    getCount() {
        return this.lineCount;
    }

    addCount() {
        if (this.lineCount < this.undoStack.length) {
            this.lineCount++;
        }
    }

    minusCount() {
        if (this.lineCount > 0) {
            this.lineCount--;
        }
    }
}