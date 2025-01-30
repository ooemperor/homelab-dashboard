/**
 * Rendering of the Home view
 * @author ooemperor
 */
import React, {useEffect, useState} from "react";
import {useStatus} from "../../hooks/useStatus";
import {Status} from "../../models/proxmox/Status";
import {MachineStatus} from "../../models/proxmox/Machines";

/**
 * Building function for the Home View
 * @constructor
 */
export default function Home() {

    const {getStatus, isLoading_status, errorMessage_status} = useStatus();

    const [status, setStatus] = useState<Status[] | null>();

    useEffect(() => {
        const loadStatus = async () => {
            const statusData = await getStatus();
            statusData.status = statusData.status?.filter((stat) => stat.id = "cluster")
            setStatus(statusData.status);
        }

        loadStatus();

    }, []);


    return (
        <div className="container">
            <div className={"row"}>
                <div className="col">
                    <h1>Home</h1>
                </div>

                <div className="row">
                    <div className="col">
                        <div className="card text-center">
                            <div className="card-header">
                                <p>
                                    <img
                                        src="https://proxmox.com/images/proxmox/Proxmox_logo_standard_hex_400px.png#joomlaImage://local-images/proxmox/Proxmox_logo_standard_hex_400px.png?width=400&amp;height=60"/>
                                </p>
                            </div>
                            <div className="card-body">
                                {isLoading_status ? <p>Loading...</p> : null}
                                {errorMessage_status.error ? <p>{errorMessage_status.message}</p> : null}
                                <p>{!isLoading_status && status && status[0].quorate &&
                                    <span className="badge text-bg-success">Quorum</span>}</p>
                                <a href="/proxmox/nodes" className="btn btn-info mx-3">Nodes</a>
                                <a href="/proxmox/lxc" className="btn btn-info mx-3">LXC</a>
                                <a href="/proxmox/vm" className="btn btn-info mx-3">VMs</a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}