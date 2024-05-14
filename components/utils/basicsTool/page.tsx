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
                        className="h-8 w-8 bg-gray-500 p-1 rounded-sm transition-all"
                        title={tool}
                    />
                </div>
            ) : (
                <div>
                    <img
                        src={`/${tool}.png`}
                        alt={tool}
                        className="h-8 w-8 p-1 rounded-sm transition-all"
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