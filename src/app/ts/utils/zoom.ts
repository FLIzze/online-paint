export default function zoom(direction: string) {
    const oldCanvas = document.getElementById('canvas') as HTMLCanvasElement;

    const newCanvas = document.createElement('canvas');
    const newCtx = newCanvas.getContext('2d') as CanvasRenderingContext2D;

    if (direction == 'in') {
        newCanvas.width = oldCanvas.width * 1.1;
        newCanvas.height = oldCanvas.height * 1.1;
    } else {
        newCanvas.width = oldCanvas.width * 0.9;
        newCanvas.height = oldCanvas.height * 0.9;
    }

    newCtx.drawImage(oldCanvas, 0, 0, newCanvas.width, newCanvas.height);

    oldCanvas.parentNode?.replaceChild(newCanvas, oldCanvas);
    newCanvas.id = 'canvas';
}