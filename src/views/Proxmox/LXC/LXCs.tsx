/**
 * Rendering of the Proxmox LXC view
 * @author ooemperor
 */
import React, {useEffect, useState} from "react";
import {useLXCs} from "../../../hooks/Proxmox/useLXCs";
import {LXC, MachineStatus} from "../../../models/proxmox/Machines";
import MachineStatusBadge from "../../../components/Proxmox/Machine";
import {Simulate} from "react-dom/test-utils";
import error = Simulate.error;
import {useNavigate} from "react-router-dom";

export default function LXCs() {

    const {getLXCs, errorMessage_lxcs, isLoading_lxcs} = useLXCs();

    const [lxcs, setLXCs] = useState<LXC[]>([]);
    const navigate = useNavigate();
    useEffect(() => {
        const loadLXCs = async () => {
            const lxcData = await getLXCs();
            setLXCs(lxcData.lxcs);
        }
        loadLXCs();

    }, []);

    return (
        <div className="container">
            <div className={"row"}>
                <div className="col">
                    <h1>LXC's</h1>
                </div>
            </div>
            <div className="row">
                <div className="col">
                    <table className="table table-hover">
                        <thead>
                        <tr>
                            <th>LXC</th>
                            <th>Node</th>
                            <th>Status</th>
                        </tr>
                        </thead>
                        <tbody>
                        {isLoading_lxcs ? <p>Loading...</p> : null}
                        {errorMessage_lxcs.error ? <p>{errorMessage_lxcs.message}</p> : null}
                        {!isLoading_lxcs && lxcs.sort((a, b) => a.name > b.name ? 1 : -1).map((lxc) => (
                            <tr className="clickable-row" key={lxc.name} onClick={ () => {navigate(`/proxmox/lxc/${lxc.name}`)}}>
                                <td>{lxc.name}</td>
                                <td>{lxc.node}</td>
                                <td>{MachineStatusBadge(lxc.status)}</td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}