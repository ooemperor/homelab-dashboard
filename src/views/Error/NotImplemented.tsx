/**
 * Rendering of the NotImplemented view
 * This view is used when a page is still under construction
 * @author ooemperor
 */
import React from "react";

export default function NotImplemented() {
    return (
        <div className="container">
            <div className={
                "row"
            }>
                <div className="col">
                    <h1>Under construction <i className="bi bi-bug-fill"></i></h1>
                </div>

                <div className="row py-2">
                    <div className="col">
                        <p>This page is not yet implemented.</p>
                    </div>
                </div>
            </div>
        </div>
    )
}
