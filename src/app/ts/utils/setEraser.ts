import Brush from "../class/brush";

export default function setEraser(draw: Brush, setDraw: React.Dispatch<React.SetStateAction<Brush>>) {
    if (!draw.eraser) {
        setDraw(
            prevDraw => new Brush(
                prevDraw.tool,
                true,
                prevDraw.color,
                prevDraw.brushSize,
                prevDraw.cursorPos,
                prevDraw.toolImg,
                prevDraw.opacity
            )
        );
    } else {
        setDraw(
            prevDraw => new Brush(
                prevDraw.tool,
                false,
                prevDraw.color,
                prevDraw.brushSize,
                prevDraw.cursorPos,
                prevDraw.toolImg,
                prevDraw.opacity
            )
        );
    }
}