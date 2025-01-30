/**
 * Rendering of the Proxmox Nodes view
 * @author ooemperor
 */
import React, {useEffect, useState} from "react";
import {useNodes} from "../../../hooks/useNodes";
import {Node} from "../../../models/proxmox/Node";
import NodeStatusBadge from "../../../components/proxmox/Node";
import { useNavigate } from "react-router-dom";

/**
 * Render the main content of the Nodes page
 * @constructor
 */
export default function Nodes() {

    const {getNodes, errorMessage, isLoading} = useNodes();

    const [nodes, setNodes] = useState<Node[]>([]);
    const navigate = useNavigate();
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
                        {isLoading ? <p>Loading...</p> : null}
                        {errorMessage.error ? <p>{errorMessage.message}</p> : null}
                        {!isLoading && nodes.sort((a, b) => a.node > b.node ? 1 : -1).map((node) => (
                            <tr className="clickable-row" key={node.node} onClick={ () => {navigate(`/proxmox/nodes/${node.node}`)}}>
                                <td>{node.node}</td>
                                <td>{NodeStatusBadge(node.status)}</td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}