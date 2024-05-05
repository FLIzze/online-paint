import LinesHistory from "@/app/ts/class/history";
import reDrawPixelsHistory from "./reDrawPixelsHistory";

let linesCount = 0;
let pixelsCountLastLine = 0;

export default function undo(history: LinesHistory, setHistory: React.Dispatch<React.SetStateAction<LinesHistory>>) {
    linesCount = 0;
    pixelsCountLastLine = 0;
    const canvas = document.getElementById('canvas') as HTMLCanvasElement;
    const ctx = canvas.getContext('2d') as CanvasRenderingContext2D;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    console.log(history);

    if (history.undoStack.length == 0) {
        return;
    }

    for (const action of history.undoStack) {
        if (action.tool == 'new line') {
            linesCount++;
            if (linesCount == history.getCount() - 1) {
                setHistory(prevHistory => new LinesHistory(
                    prevHistory.undoStack,
                    prevHistory.redoStack,
                    prevHistory.nmbPixelsInLineUndo,
                    prevHistory.getCount() - 1
                ));
                break;
            }
        } else {
            if (linesCount == history.getCount() - 2) {
                pixelsCountLastLine++;
            }
            reDrawPixelsHistory(action);
        }
    }

    for (let i = 0; i < pixelsCountLastLine - 1; i++) {
        if (i == 0) {
            history.undoStack.pop();
        } else {
            history.undo();
        }
    }

    history.nmbPixelsInLineUndo.push(pixelsCountLastLine);

    setHistory(prevHistory => new LinesHistory(
        prevHistory.undoStack,
        prevHistory.redoStack,
        prevHistory.nmbPixelsInLineUndo,
        prevHistory.getCount()
    ))
}