/**
 * useVMs
 * @author: ooemperor
 */
import {useState} from "react";
import {ErrorMessage} from "../models/ErrorMessage";
import {proxmoxService} from "../services/ProxmoxService";
import {LXCsResponse, VMsResponse} from "../models/proxmox/Machines";

/**
 * useVMs for Proxmox
 * Method used in loading the data in the Route
 * Helper method for later use in useEffect for loading data from the thingy
 */
export const useVMs = () => {
    const [errorMessage, setErrorMessageProps] = useState<ErrorMessage>({error: false, message: ''});
    const [isLoading, setIsLoading] = useState<Boolean>(false);

    const getVMs = async () => {
        setIsLoading(true);
        setErrorMessageProps({error: false, message:''});

        const vmResponse: VMsResponse = await proxmoxService.getVMs();
        if (!vmResponse.success) {
            setErrorMessageProps({error: true, message: vmResponse.message});
        }
        setIsLoading(false);
        return vmResponse;
    }
    return {getVMs, isLoading, errorMessage};
}