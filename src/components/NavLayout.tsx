/**
 * File for the whole nav layout
 * @author: ooemperor
 */
import TopNavBar from "./TopNavBar";
import SideNav from "./SideNav";
import {Outlet} from "react-router-dom";
import React, {ReactNode} from "react";

interface LayoutWithNav {
    children: ReactNode;
}

const NavLayout: React.FC<LayoutWithNav> = () => {
    return (
        <div>
            <TopNavBar/>
            <div className={"container-xxl bd-gutter my-md-3 mt-3 bd-layout"}>
                <div className={"row"}>
                    <div className="col-2 col-sm-1">
                        <SideNav/>
                    </div>
                    <div className="col">
                        <main className="bd-main order-1">
                            <Outlet/>
                        </main>
                    </div>
                </div>
            </div>
        </div>
    )
};

export default NavLayout;