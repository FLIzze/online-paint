import Brush from "@/app/ts/class/brush";
import setWidthBrush from "@/app/ts/utils/setWidthBrush";
import { useState, useRef, Dispatch, SetStateAction } from "react";

export default function Size({ setDraw }: { setDraw: Dispatch<SetStateAction<Brush>>}) {
    const [pixels, setPixels] = useState<number>(10);

    const isMouseDown = useRef(false);

    function getPixels(e: React.MouseEvent<HTMLButtonElement>) {
        const div = e.currentTarget;
        const clickPositionInPixels = e.clientX - div.getBoundingClientRect().left;
        const widthOfDivInPixels = div.offsetWidth;
        const clickPositionAsPercentage = (clickPositionInPixels / widthOfDivInPixels) * 100;
        setPixels(clickPositionAsPercentage);
        setWidthBrush(clickPositionAsPercentage * 10, setDraw);
    }

    function handleMouseDown(e: React.MouseEvent<HTMLButtonElement>) {
        isMouseDown.current = true;
        getPixels(e);
    }

    function handleMouseUp() {
        isMouseDown.current = false;
    }

    function handleMouseMove(e: React.MouseEvent<HTMLButtonElement>) {
        if (isMouseDown.current) {
            getPixels(e);
        }
    }

    return (
        <button
            className="border border-black h-7 w-32  justify-center cursor-pointer rounded-sm bg-[#383838]"
            onMouseDown={handleMouseDown}
            onMouseUp={handleMouseUp}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseUp}
        >
            <div
                className="bg-[#53728e] h-full items-center flex pl-2 text-xs"
                style={{ width: `${pixels}%` }}
            >
                <p className="select-none overflow-visible whitespace-nowrap">Size: {(pixels * 10).toFixed(0) + 'px'}</p>
            </div>
        </button>
    )
}