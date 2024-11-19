/**
 * Rendering of the Proxmox Nodes view
 * @author ooemperor
 */
import React, {useEffect, useState} from "react";
import {useNodes} from "../../hooks/useNodes";
import {Node} from "../../models/proxmox/Node";

/**
 * Render the main content of the Nodes page
 * @constructor
 */
export default function Nodes() {

    const {getNodes, errorMessage, isLoading} = useNodes();

    const [nodes, setNodes] = useState<Node[]>([]);

    useEffect(() => {
        const loadNodes = async () => {
            const nodesData = await getNodes();
            setNodes(nodesData.nodes);
        }

        loadNodes();

    }, []);

    return (
        <div className="container">
            <div className={"row"}>
                <div className="col">
                    <h1>Nodes</h1>
                </div>
            </div>
            <div className="row">
                <div className="col">
                    <table className="table table-hover">
                        <thead>
                        <tr>
                            <th>Node</th>
                            <th>Status</th>
                        </tr>
                        </thead>
                        <tbody>

                        {!isLoading && nodes.map((node) => (
                            <tr className="clickable-row" key={node.node}>
                                <td>{node.node}</td>
                                <td>{node.status}</td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}