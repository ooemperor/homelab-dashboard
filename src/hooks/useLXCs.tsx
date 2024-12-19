/**
 * useLXCs / useLXC
 * File for hooks about LXCs
 * @author: ooemperor
 */
import {useState} from "react";
import {ErrorMessage} from "../models/ErrorMessage";
import {proxmoxService} from "../services/ProxmoxService";
import {LXCResponse, LXCsResponse} from "../models/proxmox/Machines";

/**
 * useLXCs for Proxmox
 * Method used in loading the data in the Route
 * @param name The name of the LXC
 */
export const useLXC = (name: string) => {
    const [errorMessage, setErrorMessageProps] = useState<ErrorMessage>({error: false, message: ''});
    const [isLoading, setIsLoading] = useState<Boolean>(false);

    const getLXC = async () => {
        setIsLoading(true);
        setErrorMessageProps({error: false, message:''});

        const lxcResponse: LXCResponse = await proxmoxService.getLXC(name);
        if (!lxcResponse.success) {
            setErrorMessageProps({error: true, message: lxcResponse.message});
        }
        setIsLoading(false);
        return lxcResponse;
    }
    return {getLXC, isLoading, errorMessage};
}

/**
 * useLXCs for Proxmox
 * Method used in loading the data in the Route
 */
export const useLXCs = () => {
    const [errorMessage, setErrorMessageProps] = useState<ErrorMessage>({error: false, message: ''});
    const [isLoading, setIsLoading] = useState<Boolean>(false);

    const getLXCs = async () => {
        setIsLoading(true);
        setErrorMessageProps({error: false, message:''});

        const lxcsResponse: LXCsResponse = await proxmoxService.getLXCs();
        if (!lxcsResponse.success) {
            setErrorMessageProps({error: true, message: lxcsResponse.message});
        }
        setIsLoading(false);
        return lxcsResponse;
    }
    return {getLXCs, isLoading, errorMessage};
}