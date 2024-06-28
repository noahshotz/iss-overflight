import React from "react";
import { CurrentDataTab } from "./CurrentDataTab";

export const DataOverlay: React.FC = () => {

    return (
        <React.Fragment>
            <div className="absolute m-0 p-4 z-10 ">
                <h1 className="font-bold text-4xl text-white leading-none">SATTRACK</h1>
                <p className="text-white font-medium text-xl">EARTH ORBIT MONITORING</p>
            </div>
            <div className="absolute m-0 p-4 z-10 bottom-0 right-0">
                <CurrentDataTab />
            </div>
        </React.Fragment>
    )

};