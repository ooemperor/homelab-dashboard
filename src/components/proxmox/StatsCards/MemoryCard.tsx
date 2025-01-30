/**
 * File to define components for Memory Cards for proxmox
 */
import React from "react";


/**
 * Function to render a Memory Card for Proxmox
 * @param maxMemory The maximal amount of memory a machine can use
 */
export default function MemoryCard(maxMemory: number) {

    const mem: string = (maxMemory / (1024*1024)).toFixed(0)
    return (
        <div className="card text-center">
            <div className="card-header">
                <h5>
                    Max Memory
                </h5>
            </div>
            <div className="card-body">
                <h5 className="card-title">
                    {mem} MB
                </h5>
            </div>
        </div>
    )
}

