/**
 * Rendering of the Proxmox Home view
 * @author ooemperor
 */
import React from "react";
import {Toast} from "../../components/Toast";
import {toastService} from "../../services/ToastService";


export default function ProxmoxHome() {
    return (
        <div className="container">
            <div className={"row"}>
                <div className="col">
                    <h1>Proxmox</h1>
                </div>
            </div>
        </div>
    )
}