import ColorInterface from "@/app/ts/interface/colors";
import setColor from "@/app/ts/utils/setColor";
import Draggable from "../draggable/page";

export default function Colors({ setDraw }: ColorInterface) {
    const colors = ['#000000', '#808080', '#C0C0C0', '#FFFFFF', '#FF0000', '#800000', '#FFFF00', '#808000', '#00FF00', '#008000', '#00FFFF', '#008080', '#0000FF', '#000080', '#FF00FF', '#800080', '#FFA07A', '#FF4500', '#FFD700', '#FF8C00']

    return (
        <Draggable name="Palette" posX={300} posY={500}>
            <div className="grid grid-cols-10 px-2 bg-white">
                {colors.map((color, index) => (
                    <button
                        key={index}
                        style={{ backgroundColor: color }}
                        className="w-5 h-5"
                        onClick={() => setColor(colors[index], setDraw)}>
                    </button>
                ))}
            </div>
        </Draggable>
    )
}