"use client";

import { useEffect, useState } from "react"; 
import clearCanvas from "@/app/ts/clear/clearCanvas";
import clearHistory from "@/app/ts/clear/clearHistory";
import undo from "@/app/ts/historyManagement/undo";
import redo from "@/app/ts/historyManagement/redo";
import setColor from "@/app/ts/utils/setColor";
import setTool from "@/app/ts/utils/setTool";
import setWidthBrush from "@/app/ts/utils/setWidthBrush";
import handleToolClick from "@/app/ts/utils/handleToolClick";
import UtilsProps from "@/app/ts/interface/utilsProps";

export default function Utils({ data, setDraw, history, setHistory }: UtilsProps) {
    const colors = ['red', 'blue', 'green', 'yellow', 'black', 'white'];
    const utils = ['brush', 'eraser', 'bucket', 'undo', 'redo', 'zoom-in',  'zoom-out', 'logs', 'clear'];

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