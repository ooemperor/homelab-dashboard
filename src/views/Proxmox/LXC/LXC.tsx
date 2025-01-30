/**
 * Rendering of the Proxmox LXC view for a single LXC
 * @author ooemperor
 */
import React, {useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import CpuCard from "../../../components/proxmox/StatsCards/CpuCard";
import {useLXC} from "../../../hooks/useLXCs";
import {LXC} from "../../../models/proxmox/Machines";
import MemoryCard from "../../../components/proxmox/StatsCards/MemoryCard";
import HardwareStats, {HardwareStatsMachineRow} from "../../../components/proxmox/HardwareStats";

/**
 * Render the main content of the LXC page for a single LXC
 * @constructor
 */
export default function LXC_View() {
    const { name } = useParams();
    let name_: string = '';
    if (typeof name === "string") {
        name_ = name;
    }

    const {getLXC, errorMessage, isLoading} = useLXC(name_);

    const [lxc, setLXC] = useState<LXC>();

    useEffect(() => {
        const loadLXC = async () => {
            const lxcData = await getLXC();
            if (lxcData.lxc === null){
                setLXC(undefined);
            }
            else{
                setLXC(lxcData.lxc);
            }

        }
        loadLXC();

    }, []);

    return (
        <div className="container">
            <div className={"row"}>
                <div className="col">
                    <h1>LXC {name}</h1>
                </div>
            </div>
            <div className="row">
                <div className="col">
                    <p>LXC {name}</p>
                </div>
            </div>
            {isLoading ? <p>Loading...</p> : null}
            {errorMessage.error ? <p>{errorMessage.message}</p> : null}
            {!isLoading && lxc && HardwareStatsMachineRow(lxc)}
        </div>
    )
}