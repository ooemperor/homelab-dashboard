/**
 * Definition of toast according to bootstrap
 * @author: ooempeor
 */

import React, {ReactNode, useEffect, useState} from "react";
import {currentTime} from "../util/DateTime";
import {toastService} from "../services/ToastService";

/**
 * Render a single toast message
 * @param message The message to display in the toast
 * @param title The title of the toast
 * @param id The id of the message
 * @constructor
 */
export function Toast(message: string, title: string = "Dashboard", id: string = "defaultId",): ReactNode {
    return (
        <div id={id} className="toast fade show" role="alert" aria-live="assertive" aria-atomic="true" data-bs-animation="true" data-bs-autohide="true" data-bs-delay="3000">
            <div className="toast-header">
                <strong className="me-auto">{title}</strong>
                <small>{currentTime()}</small>
                <button type="button" className="btn-close" data-bs-dismiss="toast" aria-label="Close"></button>
            </div>
            <div className="toast-body">
                {message}
            </div>
        </div>
    )
}


export function ToastContainer() {
    const [toasts, setToasts] = useState<ReactNode[]>([]);

    useEffect(() => {
        const loadToasts = async () => {
            setToasts(toastService.getToasts());
        }
        loadToasts();

    }, []);

    return (
        <div className="toast-container position-fixed bottom-0 end-0 p-3">
            {toasts.map(toast => (toast))}
        </div>
    )
}