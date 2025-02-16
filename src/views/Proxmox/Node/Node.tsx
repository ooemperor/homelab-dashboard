/**
 * Rendering of the Proxmox Node view for a single Node
 * @author ooemperor
 */
import React, {useEffect, useState} from "react";
import {useNode} from "../../../hooks/Proxmox/useNodes";
import {useLXCs} from "../../../hooks/Proxmox/useLXCs";
import {Node} from "../../../models/proxmox/Node";
import {useNavigate, useParams} from "react-router-dom";
import HardwareStats from "../../../components/Proxmox/HardwareStats";
import {LXC, VM} from "../../../models/proxmox/Machines";
import MachineStatusBadge from "../../../components/Proxmox/Machine";
import Accordion from "../../../components/Accordion";
import {useVMs} from "../../../hooks/Proxmox/useVMs";

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
    const {getLXCs, errorMessage_lxcs, isLoading_lxcs} = useLXCs()
    const {getVMs, errorMessage_vms, isLoading_vms} = useVMs()


    const navigate = useNavigate();

    const [node, setNode] = useState<Node>();
    const [lxcs, setLXCs] = useState<LXC[]>();
    const [vms, setVMs] = useState<VM[]>();

    useEffect(() => {
        const loadNode = async () => {
            const nodeData = await getNode();
            if (nodeData.node === null) {
                setNode(undefined);
            } else {
                setNode(nodeData.node);
            }

        }

        const loadLXCs = async () => {
            const lxcData = await getLXCs();
            lxcData.lxcs = lxcData.lxcs.filter((lxc) => lxc.node === name);
            setLXCs(lxcData.lxcs);
        }


        const loadVMs = async () => {
            const vmsData = await getVMs();
            vmsData.vms = vmsData.vms.filter((vm) => vm.node === name);
            setVMs(vmsData.vms);
        }

        loadNode();
        loadLXCs();
        loadVMs();

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
            <div className="row">
                <div className="col">

                </div>
            </div>

            <div className="row py-2">
                <div className="col">
                    {Accordion("lxcsAccordion", "LXCs", <table className="table table-hover">
                        <thead>
                        <tr>
                            <th>LXC</th>
                            <th>Node</th>
                            <th>Status</th>
                        </tr>
                        </thead>
                        <tbody>
                        {isLoading_lxcs ? <p>Loading...</p> : null}
                        {errorMessage_lxcs.error ? <p>{errorMessage_lxcs.message}</p> : null}
                        {!isLoading_lxcs && lxcs && lxcs.map((lxc) => (
                            <tr className="clickable-row" key={lxc.name} onClick={() => {
                                navigate(`/proxmox/lxc/${lxc.name}`)
                            }}>
                                <td>{lxc.name}</td>
                                <td>{lxc.node}</td>
                                <td>{MachineStatusBadge(lxc.status)}</td>
                            </tr>
                        ))}
                        </tbody>
                    </table>)}
                </div>
            </div>

            <div className="row py-2">
                <div className="col">
                    {Accordion("vmsAccordion", "VMs", <table className="table table-hover">
                        <thead>
                        <tr>
                            <th>VM</th>
                            <th>Node</th>
                            <th>Status</th>
                        </tr>
                        </thead>
                        <tbody>
                        {isLoading_vms ? <p>Loading...</p> : null}
                        {errorMessage_vms.error ? <p>{errorMessage_vms.message}</p> : null}
                        {!isLoading_vms && vms && vms.map((vm) => (
                            <tr className="clickable-row" key={vm.name} onClick={() => {
                                navigate(`/proxmox/lxc/${vm.name}`)
                            }}>
                                <td>{vm.name}</td>
                                <td>{vm.node}</td>
                                <td>{MachineStatusBadge(vm.status)}</td>
                            </tr>
                        ))}
                        </tbody>
                    </table>)}
                </div>
            </div>
        </div>
    )
}