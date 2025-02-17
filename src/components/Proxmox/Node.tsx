/**
 * File to define components for using with Nodes
 */
import React from "react";
import {NodeStatus} from "../../models/proxmox/Node";

/**
 * Function to render a Status Badge for a proxmox Node
 * @param status
 * @constructor
 */
export default function NodeStatusBadge(status: NodeStatus) {
    if (status === NodeStatus.online) {
        return <span className="badge text-bg-success">{status}</span>
    } else {
        return <span className="badge text-bg-danger">{status}</span>
    }
}