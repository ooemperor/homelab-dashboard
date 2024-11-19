/**
 * Rendering of the SideNav for navigation
 * @author ooemperor
 */

import OffCanvasSideBar from "./OffCanvasSideBar";
import {ReactNode} from "react";

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
                    Getting started
                </strong>
            </li>
            <ul className="list-unstyled fw-normal pb-2 small">
                <li className={"bd-links-item"}>Getting started</li>
            </ul>
        </ul>
    </nav>
    return (
        OffCanvasSideBar("sideNavBar", sideNavBarContent)
    )
}