import Brush from "@/app/ts/class/brush";
import { Dispatch, SetStateAction, useState, useEffect } from "react";
import Opacity from "./opacity/page";
import Undo from "./undo/page";
import Size from "./size/page";
import Eraser from "./eraser/page";
import setEraser from "@/app/ts/utils/setEraser";
import Clear from "./clear/page"
import undo from "@/app/ts/historyManagement/undo";
import redo from "@/app/ts/historyManagement/redo";

export default function NavBar({ setDraw, draw, history, setHistory }: { setDraw: Dispatch<SetStateAction<Brush>>, draw: Brush, history: any, setHistory: Dispatch<SetStateAction<any>>}) {
    const [usedTool, setUsedTool] = useState(false);

    useEffect(() => {
        console.log(history);
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key == 'e') {
                setEraser(draw, setDraw);
                if (usedTool) {
                    setUsedTool(false);
                } else {
                    setUsedTool(true);
                }
            } else if (e.key == 'u') {
                undo(history, setHistory);
            } else if (e.key == 'r') {
                redo(history, setHistory);
            }
        };

        window.addEventListener('keydown', handleKeyDown);

        return () => {
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, [draw, history]);

    return (
        <div className="w-full flex border-black border-b flex-wrap gap-5 pl-8 bg-white h-10 text-sm items-center">
            <Undo history={history} setHistory={setHistory} />
            <Opacity setDraw={setDraw} />
            <Size setDraw={setDraw} />
            <Eraser draw={draw} setDraw={setDraw} usedTool={usedTool} setUsedTool={setUsedTool} />
            <Clear />
        </div>
    )
}