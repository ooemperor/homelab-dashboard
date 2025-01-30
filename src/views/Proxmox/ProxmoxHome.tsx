/**
 * Rendering of the Proxmox Home view
 * @author ooemperor
 */
import React from "react";


export default function ProxmoxHome() {
    return (
        <div className="container">
            <div className={"row"}>
                <div className="col">
                    <h1>Proxmox</h1>
                </div>
            </div>

            <div className="row">
                <div className="col">
                    <div className="card text-center">
                        <div className="card-header">
                            Nodes
                        </div>
                        <div className="card-body">
                            <p className="card-text">Overview over all the cluster Nodes</p>
                            <a href="/proxmox/nodes" className="btn btn-primary">Nodes</a>
                        </div>
                    </div>
                </div>

                <div className="col">
                    <div className="card text-center">
                        <div className="card-header">
                            LXCs
                        </div>
                        <div className="card-body">
                            <p className="card-text">Overview over all the LXCs</p>
                            <a href="/proxmox/lxc" className="btn btn-primary">LXCs</a>
                        </div>
                    </div>
                </div>

                <div className="col">
                    <div className="card text-center">
                        <div className="card-header">
                            VMs
                        </div>
                        <div className="card-body">
                            <p className="card-text">Overview over all the VMs</p>
                            <a href="/proxmox/vm" className="btn btn-primary">VMs</a>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    )
}