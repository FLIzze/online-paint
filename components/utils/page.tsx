import { useEffect, useState } from "react";
import setTool from "@/app/ts/utils/setTool";
import Draggable from "../draggable/page";
import BasicTools from "./basicsTool/page";
import ActionHistory from "@/app/ts/class/history";
import Brush from "@/app/ts/class/brush";

interface UtilsProps {
    setDraw: React.Dispatch<React.SetStateAction<Brush>>;
    history: ActionHistory;
}

export default function Utils({ setDraw, history }: Readonly<UtilsProps>) {
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