import appendHistory from "./historyAppendNewAction";
import reDrawPixelsHistory from "./reDrawPixelsHistory";
import clearCanvas from "./clearCanvas";
import ActionHistory from "@/app/ts/class/history";

export default function redo(history: ActionHistory, setHistory: React.Dispatch<React.SetStateAction<ActionHistory>>) {
    if (history.redoStack.length == 0) {
        console.log('nothing to redo.');
        return;
    }

    for (let i = history.nmbPixelsInLineUndo[history.nmbPixelsInLineUndo.length - 1]; i > 0; i--) {
        history.redo();
    }

    history.nmbPixelsInLineUndo.pop();

    clearCanvas();

    for (const action of history.undoStack) {
        reDrawPixelsHistory(action);
    }

    appendHistory(history, setHistory);
}