/**
 * Rendering of the SideNav for navigation
 * @author ooemperor
 */

import OffCanvasSideBar from "./OffCanvasSideBar";
import React, {ReactNode} from "react";

/**
 * Funtion to render a the specific sideNav
 * @constructor
 */
export default function SideNav() {

    const sideNavBarContent: ReactNode = <nav
        className="bd-links w-100">
        <ul className={"bd-links-nav list-unstyled mb-0 pb-3 pb-md-2 pe-lg-2"}>
            <li className={"bd-links-group py-2"}>
                <strong className="bd-links-heading d-flex w-100 align-items-center fw-semibold">
                    <a className={"nav-link d-inline-block"} href={"/proxmox"}>Proxmox</a>
                </strong>
                <ul className="list-unstyled fw-normal pb-2 small">
                <li className="ps-2">
                        <a className={"nav-link d-inline-block"} href={"/proxmox/nodes"}>Nodes</a>
                    </li>
                    <li className="ps-2">
                        <a className={"nav-link d-inline-block"} href={"/proxmox/lxc"}>LXC</a>
                    </li>
                    <li className="ps-2">
                        <a className={"nav-link d-inline-block"} href={"/proxmox/vm"}>VM</a>
                    </li>
                </ul>
            </li>
        </ul>
    </nav>
    return (
        OffCanvasSideBar("sideNavBar", sideNavBarContent)
    )
}