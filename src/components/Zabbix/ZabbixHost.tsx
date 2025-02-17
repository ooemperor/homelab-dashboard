/**
 * File to define components for using with ZabbixHosts
 */
import React from "react";
import {ZabbixHostStatus} from "../../models/zabbix/ZabbixHost";
import {ZabbixItem} from "../../models/zabbix/ZabbixItem";
import {axisClasses, barElementClasses, PieChart} from "@mui/x-charts";
import {colors} from "@mui/material";
import {ChartsLegendRoot} from "@mui/x-charts/ChartsLegend/LegendPerItem";

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
export function ZabbixItemStatsRow(items: ZabbixItem[]) {
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

export function ZabbixGraphCard(body: any) {
    return (<div className="card text-center">
        <div className="card-body">
            {body}
        </div>
    </div>)
}

export function ZabbixHostGraphRow(items: ZabbixItem[]) {
    return (
        <div className="row py-2">
            <div className="col">

                {items && ZabbixGraphCard(<PieChart

                    series={[
                        {
                            innerRadius: 30,
                            outerRadius: 100,
                            paddingAngle: 3,
                            cornerRadius: 2,
                            startAngle: 0,
                            endAngle: 360,
                            data: [
                                {
                                    id: 0,
                                    value: items.filter((element) => element.state === "0").length,
                                    label: 'supported',
                                    color: '#34af67'
                                },
                                {
                                    id: 1,
                                    value: items.filter((element) => element.state === "1").length,
                                    label: 'unsupported',
                                    color: 'red'
                                },
                            ],
                        },
                    ]}
                    slotProps={{
                        legend: {
                            labelStyle: {fill: "white"}, // Change legend text color
                        },
                    }}
                    width={400}
                    height={200}
                />)}
            </div>
        </div>
    )
}


