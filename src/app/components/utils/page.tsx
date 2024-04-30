import Brush from "../../brush";

interface UtilsProps {
    data: Brush;
    setDraw: React.Dispatch<React.SetStateAction<Brush>>;
}

export default function Utils({ data, setDraw }: UtilsProps) {
    const colors = ['red', 'blue', 'green', 'yellow', 'black', 'white']

    function colorFocus(color: string) {
        setDraw(prevDraw => ({ ...prevDraw, color: color }));
    }

    function widthBrush(e: React.ChangeEvent<HTMLInputElement>) {
        setDraw(prevDraw => ({ ...prevDraw, brushSize: Number(e.target.value) }));
    }

    function brush() {
        setDraw(prevDraw => ({ ...prevDraw, tool: 'brush', toolImg: '/brush.png' }));
    }

    function eraser() {
        setDraw(prevDraw => ({ ...prevDraw, tool: 'eraser', toolImg: '/eraser.png' }));
    }

    function fill() {
        setDraw(prevDraw => ({ ...prevDraw, tool: 'fill', toolImg: '/bucket.png' }));
    }

    function clear() {
        const canvas = document.getElementById('canvas') as HTMLCanvasElement;
        const ctx = canvas.getContext('2d') as CanvasRenderingContext2D;
        ctx.clearRect(0, 0, canvas.width, canvas.height);
    }

    return (
        <div className="absolute top-0 border border-black p-2 m-10">
            <p>x : {data.cursorPos.x}</p>
            <p>y : {data.cursorPos.y}</p>
            <button
                className="bg-black text-white"
                onClick={clear}>
                Clear
            </button>
            <div className="flex">
                {colors.map((color, index) => (
                    <div key={index}>
                        <button
                            style={{ backgroundColor: color }}
                            className="w-14 h-14"
                            onClick={() => colorFocus(colors[index])}>
                        </button>
                    </div>
                ))}
            </div>
            <input
                type="number"
                onChange={widthBrush}
                placeholder={data.brushSize.toString()}
            />
            <div className="flex align-middle">
                <button
                    className="mr-10"
                    onClick={brush}>
                    <img
                        src="/brush.png"
                        alt="brush"
                        className="w-7 h-7"
                    />
                </button>
                <button
                    className="mr-10"
                    onClick={eraser}>
                    <img
                        src="/eraser.png"
                        alt="eraser"
                        className="w-7 h-7"
                    />
                </button>
                <button
                    className="mr-10"
                    onClick={fill}>
                    <img
                        src="/bucket.png"
                        alt="bucket"
                        className="w-7 h-7"
                    />
                </button>
            </div>
        </div>
    )
}