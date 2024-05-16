import Brush from "@/app/ts/class/brush";
import setTool from "@/app/ts/utils/setTool";
import Image from "next/image";

export default function BasicTools({ setDraw, setUsedTool, usedTool, tool }: { setDraw: React.Dispatch<React.SetStateAction<Brush>>, setUsedTool: React.Dispatch<React.SetStateAction<string>>, usedTool: string, tool: string }) {
    return (
        <div>
            {usedTool == tool ? (
                <div>
                    <Image
                        src={`/${tool}.png`}
                        alt={tool}
                        className="p-1 rounded-sm bg-[#647c91] border border-black"
                        title={tool}
                        width={32}
                        height={32}
                    />
                </div>
            ) : (
                <div
                    onClick={() => {
                        setTool(tool, setDraw);
                        setUsedTool(tool);
                    }}
                >
                    <Image
                        src={`/${tool}.png`}
                        alt={tool}
                        className="p-1 rounded-sm border border-transparent hover:border-black"
                        title={tool}
                        width={32}
                        height={32}
                    />
                </div>
            )}
        </div>
    )
}