/**
 * Rendering of the Proxmox VM view for a single VM
 * @author ooemperor
 */
import React, {useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import {VM} from "../../../models/proxmox/Machines";
import {useVM} from "../../../hooks/Proxmox/useVMs";
import CpuCard from "../../../components/Proxmox/StatsCards/CpuCard";
import MemoryCard from "../../../components/Proxmox/StatsCards/MemoryCard";
import HardwareStats, {HardwareStatsMachineRow} from "../../../components/Proxmox/HardwareStats";

/**
 * Render the main content of the Nodes page
 * @constructor
 */
export default function VM_View() {
    const { name } = useParams();
    let name_: string = '';
    if (typeof name === "string") {
        name_ = name;
    }

    const {getVM, errorMessage, isLoading} = useVM(name_);

    const [vm, setVM] = useState<VM>();

    useEffect(() => {
        const loadVM = async () => {
            const vmData = await getVM();
            if (vmData.vm === null) {
                setVM(undefined);
            } else {
                setVM(vmData.vm);
            }

        }
        loadVM();

    }, []);

    return (
        <div className="container">
            <div className={"row"}>
                <div className="col">
                    <h1>VM {name}</h1>
                </div>
            </div>
            <div className="row">
                <div className="col">
                    <p>VM {name}</p>
                </div>
            </div>
            {isLoading ? <p>Loading...</p> : null}
            {errorMessage.error ? <p>{errorMessage.message}</p> : null}
            {!isLoading && vm && HardwareStatsMachineRow(vm)}
        </div>
    )
}