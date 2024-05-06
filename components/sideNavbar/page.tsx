"use client";

import Utils from "../utils/page";
import Colors from "../colors/page";
import SideNavBarInterface from "@/app/ts/interface/sideNavBar";

export default function SideNavBar({ data, setDraw, history, setHistory }: SideNavBarInterface) {
    return (
        <div className="gap-0 top-0 left-0 absolute border-black border-r bg-white p-2 h-screen">
            <Utils setDraw={setDraw} setHistory={setHistory} history={history}/>
            <Colors data={data} setDraw={setDraw}/>
        </div>
    )
}