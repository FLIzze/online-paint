import Brush from "./brush";

export default function shortcuts(e: KeyboardEvent, setDraw: React.Dispatch<React.SetStateAction<Brush>>) {
    if (e.key === 'e') {
        setDraw(prevDraw => ({ ...prevDraw, tool: 'eraser', toolImg: '/eraser.png' }));
    } else if (e.key === 'b') {
        setDraw(prevDraw => ({ ...prevDraw, tool: 'brush', toolImg: '/brush.png' }));
    } else if (e.key === 'f') {
        setDraw(prevDraw => ({ ...prevDraw, tool: 'fill', toolImg: '/bucket.png' }));
    }
};