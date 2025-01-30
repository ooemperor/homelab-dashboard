/**
 * Define a generic accordion to us as a baseline
 */

import {ReactNode} from "react";

/**
 * Renders a default Accordion with content based on the inputs
 * @param id Id to use for the ReactNode
 * @param header The header title to set in the Accordion
 * @param body ReactNode body as input for the body
 * @constructor
 */
export default function Accordion(id: string, header: string, body: ReactNode): ReactNode {

    const id_ref: string = "#" + id;


    return (
        <div className="accordion" id={id}>
            <div className="accordion-item">
                <h2 className="accordion-header">
                    <button className="accordion-button" type="button" data-bs-toggle="collapse"
                            data-bs-target={id_ref + "One"} aria-expanded="true" aria-controls="collapseOne">
                        {header}
                    </button>
                </h2>
                <div id={id + "One"} className="accordion-collapse collapse" data-bs-parent={id_ref}>
                    <div id="collapseAccordion" className="accordion-collapse collapse show"
                         data-bs-parent={id_ref}>
                        <div className="accordion-body">
                            {body}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}