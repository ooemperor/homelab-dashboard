/**
 * Rendering of the Proxmox Node view for a single Node
 * @author ooemperor
 */
import React, {useEffect, useState} from "react";
import {useNode} from "../../../hooks/useNodes";
import {Node} from "../../../models/proxmox/Node";
import {useParams} from "react-router-dom";
import HardwareStats from "../../../components/proxmox/HardwareStats";

/**
 * Render the main content of the Nodes page
 * @constructor
 */
export default function Node_View() {
    const {name} = useParams();
    let name_: string = '';
    if (typeof name === "string") {
        name_ = name;
    }

    const {getNode, errorMessage, isLoading} = useNode(name_);

    const [node, setNode] = useState<Node>();

    useEffect(() => {
        const loadNode = async () => {
            const nodeData = await getNode();
            if (nodeData.node === null) {
                setNode(undefined);
            } else {
                setNode(nodeData.node);
            }

        }
        loadNode();

    }, []);


    return (
        <div className="container">
            <div className={"row"}>
                <div className="col">
                    <h1>Node {name}</h1>
                </div>
            </div>
            <div className="row">
                <div className="col">
                    <p>Node {name}</p>
                </div>
            </div>
            {isLoading ? <p>Loading...</p> : null}
            {errorMessage.error ? <p>{errorMessage.message}</p> : null}
            {!isLoading && node && HardwareStats(node.maxcpu, node.maxmem)}
        </div>
    )
}