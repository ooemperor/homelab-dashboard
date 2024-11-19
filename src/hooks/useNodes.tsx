/**
 * useNodes
 * @author: ooemperor
 */
import {useState} from "react";
import {ErrorMessage} from "../models/ErrorMessage";
import {NodesResponse} from "../models/proxmox/Node";
import {proxmoxService} from "../services/ProxmoxService";

/**
 * useNodes for Proxmox
 * Method used in loading the data in the Route
 * Helper method for later use in useEffect for loading data from the thingy
 */
export const useNodes = () => {
    const [errorMessage, setErrorMessageProps] = useState<ErrorMessage>({error: false, message: ''});
    const [isLoading, setIsLoading] = useState<Boolean>(false);

    const getNodes = async () => {
        setIsLoading(true);
        setErrorMessageProps({error: false, message:''});

        const nodesResponse: NodesResponse = await proxmoxService.getNodes();
        if (!nodesResponse.success) {
            setErrorMessageProps({error: false, message: nodesResponse.message});
        }
        setIsLoading(false);
        return nodesResponse;
    }

    return {getNodes, isLoading, errorMessage};
}
