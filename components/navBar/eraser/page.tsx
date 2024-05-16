import setEraser from "@/app/ts/utils/setEraser";
import Brush from "@/app/ts/class/brush";
import Image from "next/image";

interface EraserProps {
    draw: Brush;
    setDraw: React.Dispatch<React.SetStateAction<Brush>>;
    setUsedTool: React.Dispatch<React.SetStateAction<boolean>>;
    usedTool: boolean;
}

export default function Eraser({ draw, setDraw, usedTool, setUsedTool }: Readonly<EraserProps>) {
    return (
        <div>
            {usedTool ? (
                <button
                    onClick={() => {
                        setUsedTool(false);
                        setEraser(draw, setDraw);
                    }}
                >
                    <Image
                        src="/eraser.png"
                        alt="eraser"
                        className="m-1 rounded-sm bg-[#647c91] border border-black"
                        width={24}
                        height={24}
                    />
                </button>
            ) : (
                <button
                    onClick={() => {
                        setUsedTool(true);
                        setEraser(draw, setDraw);
                    }}
                >
                    <Image
                        src="/eraser.png"
                        alt="eraser"
                        className="m-1 rounded-sm border border-transparent hover:border-black"
                        width={24}
                        height={24}
                    />
                </button>
            )}
        </div>
    )
}