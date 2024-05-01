import Brush from "@/app/ts/class/brush";
import PaintHistory from "@/app/ts/class/history";
import undo from "./undo";

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

function setWidthBrush(e: React.ChangeEvent<HTMLInputElement>, setDraw: React.Dispatch<React.SetStateAction<Brush>>) {
    setDraw(
        prevDraw => new Brush(
            prevDraw.tool,
            prevDraw.color,
            prevDraw.brushSize,
            prevDraw.cursorPos,
            prevDraw.toolImg
        )
    );
}

function setTool(tool: string, setDraw: React.Dispatch<React.SetStateAction<Brush>>) {
    if (tool === 'brush') {
        setDraw(
            prevDraw => new Brush(
                'brush',
                prevDraw.color,
                prevDraw.brushSize,
                prevDraw.cursorPos,
                '/brush.png'
            )
        )
    } else if (tool === 'eraser') {
        setDraw(
            prevDraw => new Brush(
                'eraser',
                prevDraw.color,
                prevDraw.brushSize,
                prevDraw.cursorPos,
                '/eraser.png'
            )
        );
    } else if (tool === 'bucket') {
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

function clear(history: PaintHistory) {
    const canvas = document.getElementById('canvas') as HTMLCanvasElement;
    const ctx = canvas.getContext('2d') as CanvasRenderingContext2D;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    history.clear();
}

function handleToolClick(util: string, setDraw: React.Dispatch<React.SetStateAction<Brush>>, setHistory: React.Dispatch<React.SetStateAction<PaintHistory>>, history: PaintHistory) {
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
    }
}

export default { setColor, setWidthBrush, setTool, clear, handleToolClick }