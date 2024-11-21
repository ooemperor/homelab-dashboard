/**
 * File to define components for using with LXC
 */
import React from "react";
import {MachineStatus} from "../../models/proxmox/Machines";


/**
 * Function to render a Status Badge for a proxmox LXC
 * @param status
 * @constructor
 */
export default function MachineStatusBadge(status: MachineStatus) {
    if (status === MachineStatus.running) {
        return <span className="badge text-bg-success">{status}</span>
    } else {
        return <span className="badge text-bg-danger">{status}</span>
    }
}

