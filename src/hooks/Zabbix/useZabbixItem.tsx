/**
 * useZabbixItem / useZabbixItems
 * File for hooks about ZabbixHosts
 * @author: ooemperor
 */
import {useState} from "react";
import {ErrorMessage} from "../../models/ErrorMessage";
import {zabbixService} from "../../services/ZabbixService";
import {ZabbixItemResponse, ZabbixItemsResponse} from "../../models/zabbix/ZabbixItem";

/**
 * useZabbixItem for Zabbix
 * Method used in loading the data in the Route
 */
export const useZabbixItem = () => {
    const [errorMessage_ZabbixItem, setErrorMessageProps] = useState<ErrorMessage>({error: false, message: ''});
    const [isLoading_ZabbixItem, setIsLoading] = useState<Boolean>(false);

    const getZabbixItem = async (id: string) => {
        setIsLoading(true);
        setErrorMessageProps({error: false, message:''});

        const itemResponse: ZabbixItemResponse = await zabbixService.getItem(id);
        if (!itemResponse.success) {
            setErrorMessageProps({error: true, message: itemResponse.message});
        }
        setIsLoading(false);
        return itemResponse;
    }

    return {getZabbixItem, isLoading_ZabbixItem, errorMessage_ZabbixItem};
}

/**
 * useZabbixItems for Zabbix
 * Method used in loading the data in the Route
 */
export const useZabbixItems = () => {
    const [errorMessage_ZabbixItems, setErrorMessageProps] = useState<ErrorMessage>({error: false, message: ''});
    const [isLoading_ZabbixItems, setIsLoading] = useState<Boolean>(false);

    const getZabbixItems = async (additional_params: any = null) => {
        setIsLoading(true);
        setErrorMessageProps({error: false, message:''});

        const itemsResponse: ZabbixItemsResponse = await zabbixService.getItems(additional_params);
        if (!itemsResponse.success) {
            setErrorMessageProps({error: true, message: itemsResponse.message});
        }
        setIsLoading(false);
        return itemsResponse;
    }

    return {getZabbixItems, isLoading_ZabbixItems, errorMessage_ZabbixItems};
}
