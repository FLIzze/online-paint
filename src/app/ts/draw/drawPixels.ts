import ActionHistory from '../class/history';
import Brush from '../class/brush';

export default function pixelsDraw(draw: Brush, lastPosition: { x: number, y: number }, setLastPosition: React.Dispatch<React.SetStateAction<{ x: number; y: number; }>>, history: ActionHistory, setHistory: React.Dispatch<React.SetStateAction<ActionHistory>>, zoom: number) {
  const canvas = document.getElementById('canvas') as HTMLCanvasElement;
  const ctx = canvas.getContext('2d') as CanvasRenderingContext2D;

  ctx.globalAlpha = draw.opacity;

  ctx.save();

  const cursorPosCanvas = {
    x: draw.cursorPos.x / zoom,
    y: draw.cursorPos.y / zoom
  };

  ctx.beginPath();
  ctx.moveTo(lastPosition.x, lastPosition.y);
  ctx.lineTo(cursorPosCanvas.x, cursorPosCanvas.y);
  ctx.lineWidth = draw.brushSize;
  ctx.lineJoin = 'round';
  ctx.lineCap = 'round';
  ctx.strokeStyle = draw.color;

  if (draw.eraser) {
    ctx.globalCompositeOperation = 'destination-out';
    ctx.strokeStyle = 'rgba(0,0,0,1)';
  } else if (draw.tool == 'brush') {
    ctx.globalCompositeOperation = 'source-over';
    ctx.strokeStyle = draw.color;
  } else if (draw.tool == 'fill') {
    ctx.globalCompositeOperation = 'source-over';
    ctx.fillStyle = draw.color;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
  }

  ctx.stroke();
  ctx.closePath();

  ctx.restore();

  setLastPosition(cursorPosCanvas);

  history.append({
    tool: draw.tool,
    eraser: draw.eraser,
    color: draw.color,
    brushSize: draw.brushSize,
    from: lastPosition,
    to: cursorPosCanvas,
    opacity: draw.opacity,
  });

  setHistory(prevHistory => new ActionHistory(
    [...prevHistory.undoStack],
    [],
    [],
    prevHistory.actionCount
  ))
}

