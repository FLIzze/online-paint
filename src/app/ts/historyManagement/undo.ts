import clearCanvas from "../clear/clearCanvas";
import ActionHistory from "../class/history";
import drawPixelsFromUndoStack from "../draw/drawPixelsFromUndoStack";

export default function undo(history: ActionHistory, setHistory: React.Dispatch<React.SetStateAction<ActionHistory>>, zoom: number) {
    let linesCount = 1;

    clearCanvas();

    if (history.undoStack.length == 0 || history.actionCount == 1 ) {
        console.log('nothing to undo.');
        return;
    }

    for (const action of history.undoStack) {
        if (action.tool == 'new line') {
            linesCount++;
            if (linesCount == history.actionCount) {
                setHistory(prevHistory => new ActionHistory(
                    [...prevHistory.undoStack],
                    [...prevHistory.redoStack],
                    [...prevHistory.nmbPixelsInLineUndo],
                    prevHistory.actionCount - 1
                ));
                break;
            }
        } else {
            drawPixelsFromUndoStack(action, zoom);
        }
    }

    history.nmbPixelsCountUndo = 0;

    try {
        history.undoStack.pop();
    } catch (e) {
        console.error(`error popping undoStack ${e}`)
    }

    while (history.undoStack[history.undoStack.length - 1].tool != 'new line') {
        history.undo();
        history.nmbPixelsCountUndo++;
    }

    history.nmbPixelsInLineUndo.push(history.nmbPixelsCountUndo);

    setHistory(prevHistory => new ActionHistory(
        [...prevHistory.undoStack],
        [...prevHistory.redoStack],
        [...prevHistory.nmbPixelsInLineUndo],
        prevHistory.actionCount
    ))
}