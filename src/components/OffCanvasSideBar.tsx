/**
 * Rendering of a offcanvas sidebar
 * @author ooemperor
 */
import {ReactNode} from "react";

export default function OffCanvasSideBar(id: string, contentBody: ReactNode) {

    return (
        <div className={"offcanvas-lg offcanvas-start"} id={id} tabIndex={-1}>
            <div className={"offcanvas-header border-bottom"}>
                <button type="button" className="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"
                        data-bs-target={"#" + id}></button>
            </div>
            <div className={"offcanvas-body"}>
                {contentBody}
            </div>
        </div>
    )
}