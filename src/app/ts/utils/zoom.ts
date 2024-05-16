export default function handleWheel(e: WheelEvent,
    setCanvasSize: React.Dispatch<React.SetStateAction<{ width: number; height: number; }>>,
    baseSize: { baseWidht: number; baseHeight: number; },
    zoom: number,
    setZoom: React.Dispatch<React.SetStateAction<number>>,
    translate: number,
    setTranslate: React.Dispatch<React.SetStateAction<number>>
) {
    e.preventDefault();

    if (e.deltaY > 0) {
        zoom -= 0.1;
    } else {
        zoom += 0.1;
    }

    if (zoom < 0.2 || zoom > 5) { return; }

    setZoom(zoom);
    setCanvasSize({ width: baseSize.baseWidht * zoom, height: baseSize.baseHeight * zoom });

    const canvas = document.getElementById('canvas') as HTMLCanvasElement;
    const ctx = canvas.getContext('2d') as CanvasRenderingContext2D;

    setTranslate(zoom / 2);

    ctx.translate(-translate * 100, -translate * 100);
}