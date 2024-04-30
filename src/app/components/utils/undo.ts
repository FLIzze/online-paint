import LinesHistory from "@/app/ts/class/history";

let count = 0;

export default function undo(history: LinesHistory, setHistory: React.Dispatch<React.SetStateAction<LinesHistory>>) {
    count = 0;
    const canvas = document.getElementById('canvas') as HTMLCanvasElement;
    const ctx = canvas.getContext('2d') as CanvasRenderingContext2D;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    if (history.getCount() == 1) {
        history.clear();
        return;
    }

    for (const action of history.undoStack) {
        if (action.tool == 'new line') {
            if (count == history.getCount() - 2) {
                history.setCount(history.getCount() - 1);
                break;
            } else {
                count++;
                history.undo();
                setHistory(history);
            }
        } else {
            ctx.beginPath();
            ctx.moveTo(action.from.x, action.from.y);
            ctx.lineTo(action.to.x, action.to.y);
            ctx.lineWidth = action.brushSize;
            ctx.lineJoin = 'round';
            ctx.lineCap = 'round';
            ctx.strokeStyle = action.color;

            if (action.tool === 'brush') {
                ctx.globalCompositeOperation = 'source-over';
                ctx.strokeStyle = action.color;
            } else if (action.tool === 'eraser') {
                ctx.globalCompositeOperation = 'destination-out';
                ctx.strokeStyle = 'rgba(0,0,0,1)';
            } else if (action.tool == 'fill') {
                ctx.globalCompositeOperation = 'source-over';
                ctx.fillStyle = action.color;
                ctx.fillRect(0, 0, canvas.width, canvas.height);
            }

            ctx.stroke();
            ctx.closePath();
        }
    }
}