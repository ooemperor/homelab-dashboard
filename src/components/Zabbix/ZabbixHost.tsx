/**
 * File to define components for using with ZabbixHosts
 */
import React from "react";
import {ZabbixHostStatus} from "../../models/zabbix/ZabbixHost";

/**
 * Function to render a Status Badge for a proxmox LXC
 * @param status
 * @constructor
 */
export default function ZabbixHostStatusBadge(status: ZabbixHostStatus) {
    if (status === ZabbixHostStatus.enabled) {
        return <span className="badge text-bg-success">enabled</span>
    } else {
        return <span className="badge text-bg-danger">disabled</span>
    }
}
