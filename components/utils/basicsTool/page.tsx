import Brush from "@/app/ts/class/brush";
import setTool from "@/app/ts/utils/setTool";

interface BasicToolsProps {
    setDraw: React.Dispatch<React.SetStateAction<Brush>>;
    setUsedTool: React.Dispatch<React.SetStateAction<string>>;
    usedTool: string;
    tool: string;
}

export default function BasicTools({ setDraw, setUsedTool, usedTool, tool }: Readonly<BasicToolsProps>) {
    return (
        <div>
            {usedTool == tool ? (
                <img
                    src={`/${tool}.png`}
                    alt={tool}
                    className="h-8 w-8 p-1 rounded-sm bg-[#647c91] border border-black"
                    title={tool}
                />
            ) : (
                <button
                    onClick={() => {
                        setTool(tool, setDraw);
                        setUsedTool(tool);
                    }}
                >
                    <img
                        src={`/${tool}.png`}
                        alt={tool}
                        className="h-8 w-8 p-1 rounded-sm border border-transparent hover:border-black"
                        title={tool}
                    />
                </button>
            )}
        </div>
    )
}