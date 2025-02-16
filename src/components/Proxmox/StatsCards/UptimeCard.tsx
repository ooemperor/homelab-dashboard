/**
 * File to define components for Uptime Cards for proxmox
 */
import React from "react";


/**
 * Function to render a Memory Card for Proxmox
 * @param uptime The uptime of the machine in seconds
 */
export default function UptimeCard(uptime: number) {
    let date = new Date(1970,0,1);
    date.setSeconds(uptime);
    const uptime_form = date.toTimeString().replace(/.*(\d{2}:\d{2}:\d{2}).*/, "$1");

    return (
        <div className="card text-center">
            <div className="card-header">
                <h5>
                    Uptime
                </h5>
            </div>
            <div className="card-body">
                <h5 className="card-title">
                    {uptime_form}
                </h5>
            </div>
        </div>
    )
}

