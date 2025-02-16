/**
 * File to define components for using with ZabbixHosts
 */
import React from "react";
import {ZabbixHostStatus} from "../../models/zabbix/ZabbixHost";
import {ZabbixItem} from "../../models/zabbix/ZabbixItem";

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


/**
 * Function to render a Item Card for Zabbix
 * @param title title for the card
 * @param itemCount The amount of Items
 */
export function ZabbixItemCard(title: string, itemCount: number) {

    return (
        <div className="card text-center">
            <div className="card-header">
                <h5>
                    {title}
                </h5>
            </div>
            <div className="card-body">
                <h5 className="card-title">
                    {itemCount}
                </h5>
            </div>
        </div>
    )
}

/**
 * Function to render the HardwareStatsRow
 * @param items The list of items of the Zabbix Host
 */
export function ZabbixItemStatsRow(items: ZabbixItem[] ) {
    return (
        <div className="row">
            <div className="col">
                {ZabbixItemCard("All Items", items.length)}
            </div>
            <div className="col">
                {ZabbixItemCard("Unsupported Items", items.filter((element) => element.state === "1").length)}
            </div>
        </div>
    )
}
