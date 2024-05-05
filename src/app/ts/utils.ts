import Brush from "@/app/ts/class/brush";
import PaintHistory from "@/app/ts/class/history";
import undo from "./historyManagement/undo";
import redo from "./historyManagement/redo";
import clearCanvas from "./clear/clearCanvas";
import clearHistory from "./clear/clearHistory";
import { SetStateAction } from "react";
import { Dispatch } from "react";

function setColor(color: string, setDraw: React.Dispatch<React.SetStateAction<Brush>>) {
    setDraw(
        prevDraw => new Brush(
            prevDraw.tool,
            color,
            prevDraw.brushSize,
            prevDraw.cursorPos,
            prevDraw.toolImg
        )
    );
}

function setWidthBrush(brushWidth: number, setDraw: React.Dispatch<React.SetStateAction<Brush>>) {
    setDraw(
        prevDraw => new Brush(
            prevDraw.tool,
            prevDraw.color,
            brushWidth,
            prevDraw.cursorPos,
            prevDraw.toolImg
        )
    );
}

function setTool(tool: string, setDraw: React.Dispatch<React.SetStateAction<Brush>>) {
    if (tool == 'brush') {
        setDraw(
            prevDraw => new Brush(
                'brush',
                prevDraw.color,
                prevDraw.brushSize,
                prevDraw.cursorPos,
                '/brush.png'
            )
        )
    } else if (tool == 'eraser') {
        setDraw(
            prevDraw => new Brush(
                'eraser',
                prevDraw.color,
                prevDraw.brushSize,
                prevDraw.cursorPos,
                '/eraser.png'
            )
        );
    } else if (tool == 'bucket') {
        setDraw(
            prevDraw => new Brush(
                'fill',
                prevDraw.color,
                prevDraw.brushSize,
                prevDraw.cursorPos,
                '/bucket.png'
            )
        );
    }
}

function handleToolClick(util: string, setDraw: React.Dispatch<React.SetStateAction<Brush>>, setHistory: React.Dispatch<React.SetStateAction<PaintHistory>>, history: PaintHistory, draw: Brush, lastPosition: { x: number, y: number }, setLastPosition: Dispatch<SetStateAction<{ x: number; y: number; }>>) {
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
    }
}

export default { setColor, setWidthBrush, setTool, handleToolClick }