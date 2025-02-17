/**
 * useNodes / useNode
 * File for hooks about Nodes
 * @author: ooemperor
 */
import {useState} from "react";
import {ErrorMessage} from "../../models/ErrorMessage";
import {NodeResponse, NodesResponse} from "../../models/proxmox/Node";
import {proxmoxService} from "../../services/ProxmoxService";

/**
 * useNode for Proxmox
 * Method used in loading the data in the Route
 */
export const useNode = (name: string) => {
    const [errorMessage, setErrorMessageProps] = useState<ErrorMessage>({error: false, message: ''});
    const [isLoading, setIsLoading] = useState<Boolean>(false);

    const getNode = async () => {
        setIsLoading(true);
        setErrorMessageProps({error: false, message:''});

        const nodeResponse: NodeResponse = await proxmoxService.getNode(name);
        if (!nodeResponse.success) {
            setErrorMessageProps({error: true, message: nodeResponse.message});
        }
        setIsLoading(false);
        return nodeResponse;
    }

    return {getNode, isLoading, errorMessage};
}

/**
 * useNodes for Proxmox
 * Method used in loading the data in the Route
 */
export const useNodes = () => {
    const [errorMessage, setErrorMessageProps] = useState<ErrorMessage>({error: false, message: ''});
    const [isLoading, setIsLoading] = useState<Boolean>(false);

    const getNodes = async () => {
        setIsLoading(true);
        setErrorMessageProps({error: false, message:''});

        const nodesResponse: NodesResponse = await proxmoxService.getNodes();
        if (!nodesResponse.success) {
            setErrorMessageProps({error: true, message: nodesResponse.message});
        }
        setIsLoading(false);
        return nodesResponse;
    }

    return {getNodes, isLoading, errorMessage};
}
