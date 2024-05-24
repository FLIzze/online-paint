import appendHistory from "./historyAddNewActionBreak";
import clearCanvas from "../clear/clearCanvas";
import ActionHistory from "@/app/ts/class/history";
import drawPixelsFromUndoStack from "../draw/drawPixelsFromUndoStack";

export default function redo(history: ActionHistory, setHistory: React.Dispatch<React.SetStateAction<ActionHistory>>, zoom: number) {
    if (history.redoStack.length == 0) {
        console.log('nothing to redo.');
        return;
    }

    for (let i = history.nmbPixelsInLineUndo[history.nmbPixelsInLineUndo.length - 1]; i > 0; i--) {
        history.redo();
    }

    try {
        history.nmbPixelsInLineUndo.pop();
    } catch(e) {
        console.error(`error popping nmbPixelsInLineUndo ${e}`)
    }

    clearCanvas();

    for (const action of history.undoStack) {
        if (action.from.x != 0) {
            drawPixelsFromUndoStack(action);
        }
    }

    appendHistory(history, setHistory);
}