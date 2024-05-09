import Brush from "../class/brush";

export default function setTool(tool: string, setDraw: React.Dispatch<React.SetStateAction<Brush>>) {
    if (tool == 'brush') {
        setDraw(
            prevDraw => new Brush(
                'brush',
                prevDraw.color,
                prevDraw.brushSize,
                prevDraw.cursorPos,
                '/brush.png',
                prevDraw.opacity
            )
        )
    } else if (tool == 'eraser') {
        setDraw(
            prevDraw => new Brush(
                'eraser',
                prevDraw.color,
                prevDraw.brushSize,
                prevDraw.cursorPos,
                '/eraser.png',
                prevDraw.opacity
            )
        );
    } else if (tool == 'bucket') {
        setDraw(
            prevDraw => new Brush(
                'fill',
                prevDraw.color,
                prevDraw.brushSize,
                prevDraw.cursorPos,
                '/bucket.png',
                prevDraw.opacity
            )
        );
    }
}