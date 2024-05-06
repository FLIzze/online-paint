import Brush from "@/app/ts/class/brush";
import PaintHistory from "@/app/ts/class/history";
import undo from "../historyManagement/undo";
import redo from "../historyManagement/redo";
import clearCanvas from "../clear/clearCanvas";
import clearHistory from "../clear/clearHistory";
import { SetStateAction } from "react";
import setTool from "./setTool";
import zoom from "./zoom";

export default function handleToolClick(util: string, setDraw: React.Dispatch<SetStateAction<Brush>>, setHistory: React.Dispatch<SetStateAction<PaintHistory>>, history: PaintHistory) {
    switch (util) {
        case 'brush':
            setTool('brush', setDraw);
            break;
        case 'eraser':
            setTool('eraser', setDraw);
            break;
        case 'bucket':
            setTool('bucket', setDraw);
            break;
        case 'undo':
            undo(history, setHistory);
            break;
        case 'redo':
            redo(history, setHistory);
            break;
        case 'clear':
            clearCanvas();
            clearHistory(setHistory);
            break;
        case 'logs':
            console.log(history);
            break;
        case 'zoom-in':
            zoom('in');
            break;
        case 'zoom-out':
            zoom('out');
            break;
    }
}