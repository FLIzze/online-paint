import Brush from "@/app/ts/class/brush";
import PaintHistory from "@/app/ts/class/history";
import undo from "@/app/components/utils/undo";

function setColor(color: string, setDraw: React.Dispatch<React.SetStateAction<Brush>>) {
    setDraw(prevDraw => ({ ...prevDraw, color: color }));
}

function setWidthBrush(e: React.ChangeEvent<HTMLInputElement>, setDraw: React.Dispatch<React.SetStateAction<Brush>>) {
    setDraw(prevDraw => ({ ...prevDraw, brushSize: Number(e.target.value) }));
}

function setTool(tool: string, setDraw: React.Dispatch<React.SetStateAction<Brush>>) {
    if (tool === 'brush') {
        setDraw(prevDraw => ({ ...prevDraw, tool: 'brush', toolImg: '/brush.png' }));
    } else if (tool === 'eraser') {
        setDraw(prevDraw => ({ ...prevDraw, tool: 'eraser', toolImg: '/eraser.png' }));
    } else if (tool === 'bucket') {
        setDraw(prevDraw => ({ ...prevDraw, tool: 'fill', toolImg: '/bucket.png' }));
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
        case 'redo':
            break;
        default:
            console.error(`Unknown tool: ${util}`);
    }
}

export default { setColor, setWidthBrush, setTool, clear, handleToolClick}