import Brush from "../class/brush";

export default interface ColorInterface {
    data: Brush;
    setDraw: React.Dispatch<React.SetStateAction<Brush>>;
}