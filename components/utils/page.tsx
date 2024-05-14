import { useEffect, useState } from "react";
import clearCanvas from "@/app/ts/clear/clearCanvas";
import clearHistory from "@/app/ts/clear/clearHistory";
import undo from "@/app/ts/historyManagement/undo";
import redo from "@/app/ts/historyManagement/redo";
import setTool from "@/app/ts/utils/setTool";
import UtilsInterface from "@/app/ts/interface/utils";
import Draggable from "../draggable/page";
import BasicTools from "./basicsTool/page";
import setEraser from "@/app/ts/utils/setEraser";

export default function Utils({ draw, setDraw, setHistory, history }: UtilsInterface) {
    const [usedTool, setUsedTool] = useState<string>('brush');

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key == 'b') {
                setTool('brush', setDraw);
                setUsedTool('brush');
            } else if (e.key == 'f') {
                setTool('fill', setDraw);
                setUsedTool('fill');
            }
        };

        window.addEventListener('keydown', handleKeyDown);

        return () => {
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, [history]);

    return (
        <Draggable name='Tools' posX={100} posY={100}>
            <div className="cursor-pointer gap-2 px-2 grid grid-cols-2">
                <BasicTools setDraw={setDraw} setUsedTool={setUsedTool} usedTool={usedTool} tool="brush" />
                <BasicTools setDraw={setDraw} setUsedTool={setUsedTool} usedTool={usedTool} tool="fill" />
            </div>
        </Draggable>
    )
}