/**
 * Define a generic modal to use as a baseline
 * @author ooemperor
 */
import {ReactNode} from "react";

/**
 * Default function to render a generic modal based on the inputs
 * @param id Id used for the reactnode later
 * @param header Header title to be set
 * @param modalBody Body to be set as react node.
 * @constructor
 */
export default function Modal(id: string, header: string, modalBody: ReactNode):ReactNode {
    return (
        <div className={"modal"} id={id}>
            <div className={"modal-dialog"}>
                <div className={"modal-content"}>
                    <div className={"modal-header"}>
                        <div className={"modal-title"}>{header}</div>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"
                                data-bs-target={"#" + id}></button>
                    </div>
                    <div className={"modal-body"}>
                        {modalBody}
                    </div>
                    <div className="modal-footer d-flex justify-content-around">
                    </div>
                </div>
            </div>
        </div>
    )
};