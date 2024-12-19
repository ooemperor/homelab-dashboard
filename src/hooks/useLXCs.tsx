/**
 * useLXCs
 * @author: ooemperor
 */
import {useState} from "react";
import {ErrorMessage} from "../models/ErrorMessage";
import {proxmoxService} from "../services/ProxmoxService";
import {LXCsResponse} from "../models/proxmox/Machines";

/**
 * useLXCs for Proxmox
 * Method used in loading the data in the Route
 * Helper method for later use in useEffect for loading data from the thingy
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