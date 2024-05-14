import clearCanvas from "@/app/ts/clear/clearCanvas";

export default function Clear() {
    return (
        <div onClick={clearCanvas}>
            <p>Clear</p>
        </div>
    )
}