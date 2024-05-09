import ColorInterface from "@/app/ts/interface/colors";
import setColor from "@/app/ts/utils/setColor";
import Draggable from "../draggable/page";

export default function Colors({ data, setDraw }: ColorInterface) {
    const colors = ['red', 'blue', 'green', 'yellow', 'black', 'white'];

    return (
        <Draggable name="Palette" posX={500} posY={500}>
            <div className="grid grid-cols-3 px-1 bg-white pt-2">
                {colors.map((color, index) => (
                    <div key={index}>
                        <button
                            style={{ backgroundColor: color }}
                            className="w-7 h-7 my-2"
                            onClick={() => setColor(colors[index], setDraw)}>
                        </button>
                    </div>
                ))}
            </div>
        </Draggable>
    )
}