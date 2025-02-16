/**
 * File to define components for using with ZabbixProxyGroup
 */
import React from "react";
import {ZabbixProxyStatus} from "../../models/zabbix/ZabbixProxy";
import {ZabbixProxyGroupStatus} from "../../models/zabbix/ZabbixProxyGroup";

/**
 * Function to render a Status Badge for a proxmox LXC
 * @param status
 * @constructor
 */
export default function ZabbixProxyGroupStatusBadge(status: ZabbixProxyGroupStatus) {
    if (status === ZabbixProxyGroupStatus.Online) {
        return <span className="badge text-bg-success">Online</span>
    } else if (status === ZabbixProxyGroupStatus.Offline) {
        return <span className="badge text-bg-danger">Offline</span>
    } else if (status === ZabbixProxyGroupStatus.Degrading) {
        return <span className="badge text-bg-danger">Degrading</span>
    } else if (status === ZabbixProxyGroupStatus.Recovering) {
        return <span className="badge text-bg-warning">Recovering</span>
    } else {
        return <span className="badge text-bg-danger">Unkown</span>
    }
}