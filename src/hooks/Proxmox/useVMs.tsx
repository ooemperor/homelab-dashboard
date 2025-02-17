/**
 * useVMs / useVM
 * File for hooks around VMs
 * @author: ooemperor
 */
import {useState} from "react";
import {ErrorMessage} from "../../models/ErrorMessage";
import {proxmoxService} from "../../services/ProxmoxService";
import {LXCsResponse, VMResponse, VMsResponse} from "../../models/proxmox/Machines";

/**
 * useVMs for Proxmox
 * Method used in loading the data in the Route
 */
export const useVM = (name: string) => {
    const [errorMessage, setErrorMessageProps] = useState<ErrorMessage>({error: false, message: ''});
    const [isLoading, setIsLoading] = useState<Boolean>(false);

    const getVM = async () => {
        setIsLoading(true);
        setErrorMessageProps({error: false, message:''});

        const vmResponse: VMResponse = await proxmoxService.getVM(name);
        if (!vmResponse.success) {
            setErrorMessageProps({error: true, message: vmResponse.message});
        }
        setIsLoading(false);
        return vmResponse;
    }
    return {getVM, isLoading, errorMessage};
}

/**
 * useVMs for Proxmox
 * Method used in loading the data in the Route
 */
export const useVMs = () => {
    const [errorMessage_vms, setErrorMessageProps] = useState<ErrorMessage>({error: false, message: ''});
    const [isLoading_vms, setIsLoading] = useState<Boolean>(false);

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
    return {getVMs, isLoading_vms, errorMessage_vms};
}