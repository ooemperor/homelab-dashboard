/**
 * Rendering of the Home view
 * @author ooemperor
 */
import React from "react";

export default function Home() {
    return (
        <div className="container">
            <div className={"row"}>
                <div className="col">
                    <h1>Home</h1>
                </div>

                <div className="row">
                    <div className="col">
                        <div className="card text-center">
                            <div className="card-header">
                                Proxmox
                            </div>
                            <div className="card-body">
                                <p>
                                    <img src="https://proxmox.com/images/proxmox/Proxmox_logo_standard_hex_400px.png#joomlaImage://local-images/proxmox/Proxmox_logo_standard_hex_400px.png?width=400&amp;height=60"/>
                                </p>
                                <a href="/proxmox/nodes" className="btn btn-primary">Nodes</a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}