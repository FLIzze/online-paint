import LinesHistory from "@/app/ts/class/history";
import appendHistory from "./historyAppendNewAction";
import reDrawPixelsHistory from "./reDrawPixelsHistory";

export default function redo(history: LinesHistory, setHistory: React.Dispatch<React.SetStateAction<LinesHistory>>) {
    const canvas = document.getElementById('canvas') as HTMLCanvasElement;
    const ctx = canvas.getContext('2d') as CanvasRenderingContext2D;

    if (history.redoStack.length == 0) {
        return;
    }

    for (let i = history.nmbPixelsInLineUndo[history.nmbPixelsInLineUndo.length - 1]; i > 0; i--) {
        history.redo();
    }

    history.nmbPixelsInLineUndo.pop();

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    for (const action of history.undoStack) {
        reDrawPixelsHistory(action);
    }

    appendHistory(history, setHistory);
}