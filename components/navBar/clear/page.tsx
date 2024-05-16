import clearCanvas from "@/app/ts/clear/clearCanvas";

export default function Clear() {
    return (
        <button onClick={
            clearCanvas
        }>
            <p>Clear</p>
        </button>
    )
}