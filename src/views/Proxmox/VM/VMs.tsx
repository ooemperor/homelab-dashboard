/**
 * Rendering of the Proxmox VMs view
 * @author ooemperor
 */
import React, {useEffect, useState} from "react";
import {VM} from "../../../models/proxmox/Machines";
import {useVMs} from "../../../hooks/useVMs";
import MachineStatusBadge from "../../../components/proxmox/Machine";
import {useNavigate} from "react-router-dom";

export default function VMs() {

    const {getVMs, errorMessage, isLoading} = useVMs();

    const [vms, setVMs] = useState<VM[]>([]);
    const navigate = useNavigate();
    useEffect(() => {
        const loadVMs = async () => {
            const vmData = await getVMs();
            setVMs(vmData.vms);
        }
        loadVMs();

    }, []);
    return (
        <div className="container">
            <div className={"row"}>
                <div className="col">
                    <h1>VM's</h1>
                </div>
            </div>
            <div className="row">
                <div className="col">
                    <table className="table table-hover">
                        <thead>
                        <tr>
                            <th>VM</th>
                            <th>Node</th>
                            <th>Status</th>
                        </tr>
                        </thead>
                        <tbody>
                        {isLoading ? <p>Loading...</p> : null}
                        {errorMessage.error ? <p>{errorMessage.message}</p> : null}
                        {!isLoading && vms.map((vm) => (
                            <tr className="clickable-row" key={vm.name} onClick={ () => {navigate(`/proxmox/vm/${vm.name}`)}}>
                                <td>{vm.name}</td>
                                <td>{vm.node}</td>
                                <td>{MachineStatusBadge(vm.status)}</td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}