"use client";

import { useEffect, Dispatch, useState } from "react"; 
import { SetStateAction } from "react";
import Brush from "@/app/ts/class/brush";
import utils from "@/app/ts/utils";
import clearCanvas from "@/app/ts/clear/clearCanvas";
import ActionHistory from "@/app/ts/class/history";
import clearHistory from "@/app/ts/clear/clearHistory";
import undo from "@/app/ts/historyManagement/undo";
import redo from "@/app/ts/historyManagement/redo";
const { setColor, setWidthBrush, setTool, handleToolClick } = utils;

interface UtilsProps {
    data: Brush;
    setDraw: Dispatch<React.SetStateAction<Brush>>; 
    history: ActionHistory;
    setHistory: Dispatch<React.SetStateAction<ActionHistory>>;
    draw: Brush;
    lastPosition: {x: number, y: number};
    setLastPosition: Dispatch<SetStateAction<{
        x: number;
        y: number;
    }>>
}

export default function Utils({ data, setDraw, history, setHistory, draw, lastPosition, setLastPosition }: UtilsProps) {
    const colors = ['red', 'blue', 'green', 'yellow', 'black', 'white'];
    const utils = ['brush', 'eraser', 'bucket', 'undo', 'redo', 'zoom-in',  'zoom-out', 'logs', 'clear'];
    const [zoomLevel, setZoomLevel] = useState<number>(1);

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key == 'e') {
                setTool('eraser', setDraw);
            } else if (e.key == 'b') {
                setTool('brush', setDraw);
            } else if (e.key == 'f') {
                setTool('bucket', setDraw);
            } else if (e.key == 'Delete') {
                clearCanvas();
                clearHistory(setHistory);
            } else if (e.key == 'u') {
                undo(history, setHistory);
            } else if (e.key == 'r') {
                redo(history, setHistory)
            }
        };

        window.addEventListener('keydown', handleKeyDown);

        return () => {
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, [history]);

    return (
        <div className="absolute top-0 border border-black p-2 m-8">
            <p>x : {data.cursorPos.x}</p>
            <p>y : {data.cursorPos.y}</p>
            <p>zoom : {zoomLevel}</p>
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
                onChange={(e) => setWidthBrush(Number(e.target.value), setDraw)}
                placeholder={data.brushSize.toString()}
            />
            <div className="flex align-middle">
                {utils.map((util, index) => (
                    <div key={index}>
                        <button
                            className="mr-10"
                            onClick={() => handleToolClick(util, setDraw, setHistory, history, draw, lastPosition, setLastPosition)}>
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