import { useState, useRef } from "react";
import Brush from "@/app/ts/class/brush";
import ActionHistory from "@/app/ts/class/history";
import redo from "@/app/ts/historyManagement/redo";
import undo from "@/app/ts/historyManagement/undo";
import { Dispatch, SetStateAction } from "react";
import setOpacity from "@/app/ts/utils/setOpacity";

export default function NavBar({ setDraw, history, setHistory }: { setDraw: Dispatch<SetStateAction<Brush>>, history: ActionHistory, setHistory: React.Dispatch<React.SetStateAction<ActionHistory>> }) {
    const [pourcentage, setPourcentage] = useState<number>(100);
    const isMouseDown = useRef(false);

    function getPourcentage(e: React.MouseEvent<HTMLDivElement>) {
        const div = e.currentTarget;
        const clickPositionInPixels = e.clientX - div.getBoundingClientRect().left;
        const widthOfDivInPixels = div.offsetWidth;
        const clickPositionAsPercentage = (clickPositionInPixels / widthOfDivInPixels) * 100;
        setPourcentage(clickPositionAsPercentage);
        setOpacity(clickPositionAsPercentage / 100, setDraw);
    }

    function handleMouseDown(e: React.MouseEvent<HTMLDivElement>) {
        isMouseDown.current = true;
        getPourcentage(e);
    }

    function handleMouseUp() {
        isMouseDown.current = false;
    }

    function handleMouseMove(e: React.MouseEvent<HTMLDivElement>) {
        if (isMouseDown.current) {
            getPourcentage(e);
        }
    }

    return (
        <div className="w-full flex border-black border-b flex-wrap gap-5 pl-8 bg-white h-14 text-sm items-center">
            <button
                onClick={() => undo(history, setHistory)}>
                <img
                    src="/undo.png"
                    alt="undo"
                    className="w-4 h-4" />
            </button>
            <button
                onClick={() => redo(history, setHistory)}>
                <img
                    src="/redo.png"
                    alt="redo"
                    className="w-4 h-4" />
            </button>
            <p>opacity :</p>
            <div
                className="border border-black h-7 w-56"
                onMouseDown={handleMouseDown}
                onMouseUp={handleMouseUp}
                onMouseMove={handleMouseMove}
                onMouseLeave={handleMouseUp}
            >
                <div
                    className="bg-blue-200 h-full items-center flex pl-2"
                    style={{ width: `${pourcentage}%` }}
                >
                    <p className="select-none">{pourcentage.toFixed(0) + '%'}</p>
                </div>
            </div>
        </div>
    )
}