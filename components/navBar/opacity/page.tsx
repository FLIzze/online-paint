import Brush from "@/app/ts/class/brush";
import setOpacity from "@/app/ts/utils/setOpacity";
import { useState, useRef, Dispatch, SetStateAction } from "react";

interface OpacityProps {
    setDraw: Dispatch<SetStateAction<Brush>>;
}

export default function Opacity({ setDraw }: Readonly<OpacityProps>) {
    const [pourcentage, setPourcentage] = useState<number>(100);

    const isMouseDown = useRef(false);

    function getPourcentage(e: React.MouseEvent<HTMLButtonElement>) {
        const div = e.currentTarget;
        const clickPositionInPixels = e.clientX - div.getBoundingClientRect().left;
        const widthOfDivInPixels = div.offsetWidth;
        const clickPositionAsPercentage = (clickPositionInPixels / widthOfDivInPixels) * 100;
        setPourcentage(clickPositionAsPercentage);
        setOpacity(clickPositionAsPercentage / 100, setDraw);
    }

    function handleMouseDown(e: React.MouseEvent<HTMLButtonElement>) {
        isMouseDown.current = true;
        getPourcentage(e);
    }

    function handleMouseUp() {
        isMouseDown.current = false;
    }

    function handleMouseMove(e: React.MouseEvent<HTMLButtonElement>) {
        if (isMouseDown.current) {
            getPourcentage(e);
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
                style={{ width: `${pourcentage}%` }}
            >
                <p className="select-none overflow-visible whitespace-nowrap">Opacity: {pourcentage.toFixed(0) + '%'}</p>
            </div>
        </button>
    )
}