import Brush from "../class/brush";

export default function setWidthBrush(brushWidth: number, setDraw: React.Dispatch<React.SetStateAction<Brush>>) {
    setDraw(
        prevDraw => new Brush(
            prevDraw.tool,
            prevDraw.color,
            brushWidth,
            prevDraw.cursorPos,
            prevDraw.toolImg,
            prevDraw.opacity
        )
    );
}