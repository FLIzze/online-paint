import Brush from "@/app/ts/class/brush";
import setTool from "@/app/ts/utils/setTool";
import Image from "next/image";

interface BasicToolsProps {
    setDraw: React.Dispatch<React.SetStateAction<Brush>>;
    setUsedTool: React.Dispatch<React.SetStateAction<string>>;
    usedTool: string;
    tool: string;
}

export default function BasicTools({ setDraw, setUsedTool, usedTool, tool }: Readonly<BasicToolsProps>) {
    const imgUrl = `/${tool}.png`;

    return (
        <div>
            {usedTool == tool ? (
                <Image
                    src={imgUrl}
                    alt={tool}
                    className="p-1 rounded-sm bg-[#647c91] border border-black"
                    title={tool}
                    width={32}
                    height={32}
                />
            ) : (
                <button
                    onClick={() => {
                        setTool(tool, setDraw);
                        setUsedTool(tool);
                    }}
                >
                    <Image
                        src={imgUrl}
                        alt={tool}
                        className="p-1 rounded-sm border border-transparent hover:border-black"
                        title={tool}
                        width={32}
                        height={32}
                    />
                </button>
            )}
        </div>
    )
}