/**
 * Define a generic modal to use as a baseline
 * @author ooemperor
 */
import {ReactNode} from "react";

export default function Modal(id: string, header: string, modalBody: ReactNode) {
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