import { useEffect, useState } from "react";
import clearCanvas from "@/app/ts/clear/clearCanvas";
import clearHistory from "@/app/ts/clear/clearHistory";
import undo from "@/app/ts/historyManagement/undo";
import redo from "@/app/ts/historyManagement/redo";
import setTool from "@/app/ts/utils/setTool";
import handleToolClick from "@/app/ts/utils/handleToolClick";
import UtilsInterface from "@/app/ts/interface/utils";

export default function Utils({ setDraw, setHistory, history }: UtilsInterface) {
    const utils = ['brush', 'eraser', 'bucket'];
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
                setUsedToolState('bucket');
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
        <div>
            <p className="w-full mb-1">Outils</p>
            <div className="grid grid-cols-3 gap-2">
                {utils.map((util, index) => (
                    <div key={index}>
                        {usedTool == util ? (
                            <div>
                                <button
                                    onClick={() => {
                                        handleToolClick(util, setDraw, setHistory, history);
                                    }}>
                                    <img
                                        src={`/${util}.png`}
                                        alt={util}
                                        className="w-8 h-8 p-1 bg-slate-200 transition-all rounded-lg border border-black"
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
                                        className="w-8 h-8 p-1 hover:bg-slate-200 transition-all rounded-lg border border-transparent"
                                        title={`${util} [${util[0]}]`}
                                    />
                                </button>
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </div>
    )
}