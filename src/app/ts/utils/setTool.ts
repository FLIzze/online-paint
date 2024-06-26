import Brush from "../class/brush";

export default function setTool(tool: string, setDraw: React.Dispatch<React.SetStateAction<Brush>>) {
    if (tool == 'brush') {
        setDraw(
            prevDraw => new Brush(
                'brush',
                prevDraw.eraser,
                prevDraw.color,
                prevDraw.brushSize,
                prevDraw.cursorPos,
                '/brush.png',
                prevDraw.opacity
            )
        )
    } else if (tool == 'fill') {
        setDraw(
            prevDraw => new Brush(
                'fill',
                prevDraw.eraser,
                prevDraw.color,
                prevDraw.brushSize,
                prevDraw.cursorPos,
                '/fill.png',
                prevDraw.opacity
            )
        );
    }
}