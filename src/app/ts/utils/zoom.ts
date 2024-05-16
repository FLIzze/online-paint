import drawPixelsAfterZoom from "../draw/drawAfterZoom";
import drawPixelsFromUndoStack from "../draw/drawPixelsFromUndoStack";

export default function handleWheel(e: WheelEvent, setCanvasSize: React.Dispatch<React.SetStateAction<{ width: number; height: number; }>>, baseSize: { baseWidht: number; baseHeight: number; }, zoom: number, setZoom: React.Dispatch<React.SetStateAction<number>>) {
    let newZoom = zoom;
    if (e.deltaY > 0) {
        newZoom = zoom - 0.1;
    } else {
        newZoom = zoom + 0.1;
    }

    if (newZoom < 0.2 || newZoom > 5) { return; }

    setZoom(newZoom);
    setCanvasSize({ width: baseSize.baseWidht * newZoom, height: baseSize.baseHeight * newZoom });
}