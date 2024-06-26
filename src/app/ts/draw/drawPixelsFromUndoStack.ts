export default function drawPixelsFromUndoStack(action: StackInterface) {
  const canvas = document.getElementById('canvas') as HTMLCanvasElement;
  const ctx = canvas.getContext('2d') as CanvasRenderingContext2D;

  ctx.globalAlpha = action.opacity;

  ctx.save();

  ctx.beginPath();
  ctx.moveTo(action.from.x, action.from.y);
  ctx.lineTo(action.to.x, action.to.y);
  ctx.lineWidth = action.brushSize;
  ctx.lineJoin = 'round';
  ctx.lineCap = 'round';
  ctx.strokeStyle = action.color;

  if (action.eraser) {
    ctx.globalCompositeOperation = 'destination-out';
    ctx.strokeStyle = 'rgba(0,0,0,1)';
  } else if (action.tool == 'brush') {
    ctx.globalCompositeOperation = 'source-over';
    ctx.strokeStyle = action.color;
  } else if (action.tool == 'fill') {
    ctx.globalCompositeOperation = 'source-over';
    ctx.fillStyle = action.color;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
  }

  ctx.stroke();
  ctx.closePath();

  ctx.restore();
}