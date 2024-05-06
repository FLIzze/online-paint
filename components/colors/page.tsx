import ColorInterface from "@/app/ts/interface/colors";
import setColor from "@/app/ts/utils/setColor";
import setWidthBrush from "@/app/ts/utils/setWidthBrush";

export default function Colors({ data, setDraw }: ColorInterface) {
    const colors = ['red', 'blue', 'green', 'yellow', 'black', 'white'];

    return (
        <div>
            <p>x : {data.cursorPos.x}</p>
            <p>y : {data.cursorPos.y}</p>
            <div className="flex">
                {colors.map((color, index) => (
                    <div
                        key={index}
                        className="flex flex-col"
                    >
                        <button
                            style={{ backgroundColor: color }}
                            className="w-10 h-10 my-2"
                            onClick={() => setColor(colors[index], setDraw)}>
                        </button>
                    </div>
                ))}
            </div>
            <input
                type="number"
                onChange={(e) => setWidthBrush(Number(e.target.value), setDraw)}
                placeholder={data.brushSize.toString()}
                className="w-14 outline-none border border-black text-center"
            />
        </div>
    )
}