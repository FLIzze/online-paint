import reDrawPixelsHistory from "./reDrawPixelsHistory";
import clearCanvas from "./clearCanvas";
import ActionHistory from "./class/history";

export default function undo(history: ActionHistory, setHistory: React.Dispatch<React.SetStateAction<ActionHistory>>) {
    let linesCount = 1;

    clearCanvas();

    if (history.undoStack.length == 0 ) {
        console.log('nothing to undo.');
        return;
    } else if (history.actionCount == 1) {
        console.log('cant undo clear instead.');
        clearCanvas();
        setHistory(new ActionHistory(
            [],
            [],
            [],
            0
        ))
        return;
    }

    for (const action of history.undoStack) {
        if (action.tool == 'new line') {
            linesCount++;
            if (linesCount == history.actionCount) {
                setHistory(prevHistory => new ActionHistory(
                    prevHistory.undoStack,
                    prevHistory.redoStack,
                    prevHistory.nmbPixelsInLineUndo,
                    prevHistory.actionCount - 1
                ));
                break;
            }
        } else {
            reDrawPixelsHistory(action);
        }
    }

    history.nmbPixelsCountUndo = 0;

    history.undoStack.pop();

    while (history.undoStack[history.undoStack.length - 1].tool != 'new line') {
        history.undo();
        history.nmbPixelsCountUndo++;
    }

    history.nmbPixelsInLineUndo.push(history.nmbPixelsCountUndo);

    setHistory(prevHistory => new ActionHistory(
        prevHistory.undoStack,
        prevHistory.redoStack,
        prevHistory.nmbPixelsInLineUndo,
        prevHistory.actionCount
    ))
}