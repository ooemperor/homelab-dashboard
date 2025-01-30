/**
 * useStatus
 * File for hooks about the Status of the cluster
 * @author: ooemperor
 */


import {useState} from "react";
import {ErrorMessage} from "../models/ErrorMessage";
import {proxmoxService} from "../services/ProxmoxService";
import {StatusResponse} from "../models/proxmox/Status";

/**
 * useStatus for Proxmox
 * Method used in loading the data in the Route
 */
export const useStatus = () => {
    const [errorMessage_status, setErrorMessageProps] = useState<ErrorMessage>({error: false, message: ''});
    const [isLoading_status, setIsLoading] = useState<Boolean>(false);

    const getStatus = async () => {
        setIsLoading(true);
        setErrorMessageProps({error: false, message:''});

        const statusResponse: StatusResponse = await proxmoxService.getStatus();
        if (!statusResponse.success) {
            setErrorMessageProps({error: true, message: statusResponse.message});
        }
        setIsLoading(false);
        return statusResponse;
    }

    return {getStatus, isLoading_status, errorMessage_status};
}