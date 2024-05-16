import setColor from "@/app/ts/utils/setColor";
import Draggable from "../draggable/page";
import Brush from "@/app/ts/class/brush";

interface ColorsProps {
    setDraw: React.Dispatch<React.SetStateAction<Brush>>;
}

export default function Colors({ setDraw }: Readonly<ColorsProps>) {
    const colors = ['#000000', '#808080', '#C0C0C0', '#FFFFFF', '#FF0000', '#800000', '#FFFF00', '#808000', '#00FF00', '#008000', '#00FFFF', '#008080', '#0000FF', '#000080', '#FF00FF', '#800080', '#FFA07A', '#FF4500', '#FFD700', '#FF8C00']

    return (
        <Draggable name="Palette" posX={300} posY={500}>
            <div className="grid grid-cols-10 px-2">
                {colors.map((color, index) => (
                    <button
                        key={color}
                        style={{ backgroundColor: color }}
                        className="w-5 h-5"
                        onClick={() => setColor(colors[index], setDraw)}>
                    </button>
                ))}
            </div>
        </Draggable>
    )
}