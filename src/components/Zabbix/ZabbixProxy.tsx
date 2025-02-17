/**
 * File to define components for using with ZabbixProxy
 */
import React from "react";
import {ZabbixProxyStatus} from "../../models/zabbix/ZabbixProxy";

/**
 * Function to render a Status Badge for a proxmox LXC
 * @param status
 * @constructor
 */
export default function ZabbixProxyStatusBadge(status: ZabbixProxyStatus) {
    if (status === ZabbixProxyStatus.Online) {
        return <span className="badge text-bg-success">Online</span>
    } else if (status === ZabbixProxyStatus.Offline) {
        return <span className="badge text-bg-danger">Offline</span>
    } else {
        return <span className="badge text-bg-danger">Unkown</span>
    }
}
