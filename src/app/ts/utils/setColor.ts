import Brush from "../class/brush";

export default function setColor(color: string, setDraw: React.Dispatch<React.SetStateAction<Brush>>) {
    setDraw(
        prevDraw => new Brush(
            prevDraw.tool,
            prevDraw.eraser,
            color,
            prevDraw.brushSize,
            prevDraw.cursorPos,
            prevDraw.toolImg,
            prevDraw.opacity
        )
    );
}