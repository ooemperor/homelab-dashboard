/**
 * File to define components for using with LXC
 */
import React from "react";
import {LXCStatus} from "../../models/proxmox/LXC";


/**
 * Function to render a Status Badge for a proxmox LXC
 * @param status
 * @constructor
 */
export default function LXCStatusBadge(status: LXCStatus) {
    if (status === LXCStatus.running) {
        return <span className="badge text-bg-success">{status}</span>
    } else {
        return <span className="badge text-bg-danger">{status}</span>
    }
}

