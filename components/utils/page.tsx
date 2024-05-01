"use client";

import { useEffect, Dispatch } from "react"; 
import Brush from "@/app/ts/class/brush";
import LinesHistory from "@/app/ts/class/history";
import undo from "@/app/ts/undo";
import utils from "../../src/app/ts/utils";
const { setColor, setWidthBrush, setTool, clear, handleToolClick } = utils;

interface UtilsProps {
    data: Brush;
    setDraw: Dispatch<React.SetStateAction<Brush>>; 
    history: LinesHistory;
    setHistory: Dispatch<React.SetStateAction<LinesHistory>>;
}

export default function Utils({ data, setDraw, history, setHistory }: UtilsProps) {
    const colors = ['red', 'blue', 'green', 'yellow', 'black', 'white'];
    const utils = ['brush', 'eraser', 'bucket', 'undo', 'redo'];

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key == 'e') {
                setTool('eraser', setDraw);
            } else if (e.key == 'b') {
                setTool('brush', setDraw);
            } else if (e.key == 'f') {
                setTool('bucket', setDraw);
            } else if (e.key == 'Delete') {
                clear(history);
            } else if (e.key == 'z' && e.ctrlKey) {
                undo(history, setHistory);
            }
        };

        window.addEventListener('keydown', handleKeyDown);

        return () => {
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, []);

    return (
        <div className="absolute top-0 border border-black p-2 m-10">
            <p>x : {data.cursorPos.x}</p>
            <p>y : {data.cursorPos.y}</p>
            <button
                className="bg-black text-white"
                onClick={() => clear(history)}>
                Clear
            </button>
            <div className="flex">
                {colors.map((color, index) => (
                    <div key={index}>
                        <button
                            style={{ backgroundColor: color }}
                            className="w-14 h-14"
                            onClick={() => setColor(colors[index], setDraw)}>
                        </button>
                    </div>
                ))}
            </div>
            <input
                type="number"
                onChange={(e) => setWidthBrush(e, setDraw)}
                placeholder={data.brushSize.toString()}
            />
            <div className="flex align-middle">
                {utils.map((util, index) => (
                    <div key={index}>
                        <button
                            className="mr-10"
                            onClick={() => handleToolClick(util, setDraw, setHistory, history)}>
                            <img
                                src={`/${util}.png`}
                                alt={util}
                                className="w-7 h-7"
                                title={`${util} [${util[0]}]`}
                            />
                        </button>
                    </div>
                ))}
            </div>
        </div>
    )
}