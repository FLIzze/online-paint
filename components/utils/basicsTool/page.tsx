import Brush from "@/app/ts/class/brush";
import setTool from "@/app/ts/utils/setTool";

export default function BasicTools({ setDraw, setUsedTool, usedTool, tool }: { setDraw: React.Dispatch<React.SetStateAction<Brush>>, setUsedTool: React.Dispatch<React.SetStateAction<string>>, usedTool: string, tool: string}) {
    return (
        <div>
            {usedTool == tool ? (
                <div>
                    <img
                        src={`/${tool}.png`}
                        alt={tool}
                        className="h-8 w-8 p-1 rounded-sm bg-[#647c91] border border-black"
                        title={tool}
                    />
                </div>
            ) : (
                <div>
                    <img
                        src={`/${tool}.png`}
                        alt={tool}
                        className="h-8 w-8 p-1 rounded-sm border border-transparent hover:border-black"
                        onClick={() => {
                            setTool(tool, setDraw);
                            setUsedTool(tool);
                        }}
                        title={tool}
                    />
                </div>
            )}
        </div>
    )
}