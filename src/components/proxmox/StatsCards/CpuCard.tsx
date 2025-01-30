/**
 * File to define components for CPU Cards for proxmox
 */
import React from "react";

/**
 * Function to render a CPU Card for Proxmox
 * @param maxCpu The amount of CPU Cores assigned to the machine
 */
export default function CpuCard(maxCpu: number) {
    return (
        <div className="card text-center">
            <div className="card-header">
                <h5>
                    Max CPU
                </h5>
            </div>
            <div className="card-body">
                <h5 className="card-title">
                    {maxCpu}
                </h5>
            </div>
        </div>
    )
}

