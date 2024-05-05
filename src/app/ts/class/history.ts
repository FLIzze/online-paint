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
        let line: StackInterface
        if (this.undoStack.length > 0) {
            try {
                line = this.undoStack.pop() as StackInterface;
                this.redoStack.push(line);
            } catch (e) {
                console.error(`error popping undoStack ${e}`)
            }
        }
    }

    redo() {
        let line: StackInterface
        if (this.undoStack.length > 0) {
            try {
                line = this.redoStack.pop() as StackInterface;
                this.undoStack.push(line);
            } catch (e) {
                console.error(`error popping redoStack ${e}`)
            }
        }
    }
}