export default class ActionHistory {
    undoStack: Array<StackInterface> = [];
    redoStack: Array<StackInterface> = [];
    nmbPixelsInLineUndo: number[] = [];
    nmbPixelsCountUndo : number = 0;
    actionCount: number = 0;

    constructor(undoStack: Array<StackInterface>, redoStack: Array<StackInterface>, nmbPixelsInLineUndo: number[], actionCount: number) {
        this.undoStack = undoStack;
        this.redoStack = redoStack;
        this.nmbPixelsInLineUndo = nmbPixelsInLineUndo;
        this.actionCount = actionCount;
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
}