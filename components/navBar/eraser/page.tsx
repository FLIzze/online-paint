import setEraser from "@/app/ts/utils/setEraser";
import Brush from "@/app/ts/class/brush";
import Image from "next/image";

export default function Eraser({ draw, setDraw, usedTool, setUsedTool }: { draw: Brush, setDraw: React.Dispatch<React.SetStateAction<Brush>>, setUsedTool: React.Dispatch<React.SetStateAction<boolean>>, usedTool: boolean}) {
    return (
        <div>
            {usedTool == true ? (
                <button>
                    <Image
                        src="eraser.png"
                        alt="eraser"
                        className="p-1 rounded-sm bg-[#647c91] border border-black"
                        onClick={() => {
                            setUsedTool(false);
                            setEraser(draw, setDraw);
                        }}
                        width={32}
                        height={32}
                    />
                </button>
            ) : (
                <button>
                    <Image
                        src="eraser.png"
                        alt="eraser"
                        className="p-1 rounded-sm border border-transparent hover:border-black"
                        onClick={() => {
                            setUsedTool(true);
                            setEraser(draw, setDraw);
                        }}
                        width={32}
                        height={32}
                    />
                </button>
            )}
        </div>
    )
}