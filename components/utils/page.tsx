import { useEffect, useState } from "react";
import clearCanvas from "@/app/ts/clear/clearCanvas";
import clearHistory from "@/app/ts/clear/clearHistory";
import undo from "@/app/ts/historyManagement/undo";
import redo from "@/app/ts/historyManagement/redo";
import setTool from "@/app/ts/utils/setTool";
import handleToolClick from "@/app/ts/utils/handleToolClick";
import UtilsInterface from "@/app/ts/interface/utils";
import Draggable from "../draggable/page";

export default function Utils({ setDraw, setHistory, history }: UtilsInterface) {
    const utils = ['brush', 'eraser', 'fill'];
    const [usedTool, setUsedTool] = useState<string>('brush');

    function setUsedToolState(tool: string) {
        setUsedTool(tool);
    }

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key == 'e') {
                setUsedToolState('eraser');
                setTool('eraser', setDraw);
            } else if (e.key == 'b') {
                setUsedToolState('brush');
                setTool('brush', setDraw);
            } else if (e.key == 'f') {
                setUsedToolState('fill');
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
        <Draggable name='Tools' posX={100} posY={100}>
            <div className="flex">
                {utils.map((util, index) => (
                    <div
                        key={index}
                        className="px-2">
                        {usedTool == util ? (
                            <div>
                                <button
                                    onClick={() => {
                                        handleToolClick(util, setDraw, setHistory, history);
                                    }}>
                                    <img
                                        src={`/${util}.png`}
                                        alt={util}
                                        className="w-8 h-8 p-1 bg-slate-200 transition-all rounded-sm border border-black"
                                        title={`${util} [${util[0]}]`}
                                    />
                                </button>
                            </div>
                        ) : (
                            <div>
                                <button
                                    onClick={() => {
                                        handleToolClick(util, setDraw, setHistory, history);
                                        setUsedToolState(util);
                                    }}>
                                    <img
                                        src={`/${util}.png`}
                                        alt={util}
                                        className="w-8 h-8 p-1 hover:bg-slate-200 transition-all rounded-sm border border-transparent"
                                        title={`${util} [${util[0]}]`}
                                    />
                                </button>
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </Draggable>
    )
}