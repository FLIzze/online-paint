import Brush from "../class/brush";

export default interface ColorInterface {
    setDraw: React.Dispatch<React.SetStateAction<Brush>>;
}