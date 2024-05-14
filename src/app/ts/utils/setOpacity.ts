import Brush from "../class/brush";
import { Dispatch, SetStateAction } from "react";

export default function setOpacity(opacity: number, setDraw: Dispatch<SetStateAction<Brush>>) {
    setDraw(prevDraw => new Brush(
        prevDraw.tool,
        prevDraw.eraser,
        prevDraw.color,
        prevDraw.brushSize,
        prevDraw.cursorPos,
        prevDraw.toolImg,
        opacity
    ));
}