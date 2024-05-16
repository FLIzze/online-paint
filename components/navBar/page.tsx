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
import clearCanvas from "@/app/ts/clear/clearCanvas";
import clearHistory from "@/app/ts/clear/clearHistory";

interface NavBarProps {
    setDraw: Dispatch<SetStateAction<Brush>>;
    draw: Brush;
    history: any;
    setHistory: Dispatch<SetStateAction<any>>;
    zoom: number;
}

export default function NavBar({ setDraw, draw, history, setHistory, zoom }: Readonly<NavBarProps>) {
    const [usedTool, setUsedTool] = useState(false);

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key == 'e') {
                setEraser(draw, setDraw);
                if (usedTool) {
                    setUsedTool(false);
                } else {
                    setUsedTool(true);
                }
            } else if (e.key == 'u') {
                undo(history, setHistory, zoom);
            } else if (e.key == 'r') {
                redo(history, setHistory, zoom);
            } else if (e.key == 'Delete') {
                clearCanvas();
                clearHistory(setHistory);
            }
        };

        window.addEventListener('keydown', handleKeyDown);

        return () => {
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, [draw, history, zoom]);

    return (
        <div className="w-full flex border-black border-b flex-wrap gap-5 pl-8 bg-[#494949] h-10 text-sm items-center cursor-pointer text-white sticky">
            <Undo history={history} setHistory={setHistory} />
            <Opacity setDraw={setDraw} />
            <Size setDraw={setDraw} />
            <Eraser draw={draw} setDraw={setDraw} usedTool={usedTool} setUsedTool={setUsedTool} />
            <Clear setHistory={setHistory}/>
            <p>zoom: {(zoom * 100).toFixed(0)}%</p>
        </div>
    )
}