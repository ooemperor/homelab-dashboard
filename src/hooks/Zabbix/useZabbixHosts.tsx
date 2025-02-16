/**
 * useZabbixHost / useZabbixHosts
 * File for hooks about ZabbixHosts
 * @author: ooemperor
 */
import {useState} from "react";
import {ErrorMessage} from "../../models/ErrorMessage";
import {ZabbixHostResponse, ZabbixHostsResponse} from "../../models/zabbix/ZabbixHost";
import {zabbixService} from "../../services/ZabbixService";

/**
 * useZabbixHost for Zabbix
 * Method used in loading the data in the Route
 */
export const useZabbixHost = () => {
    const [errorMessage_ZabbixHost, setErrorMessageProps] = useState<ErrorMessage>({error: false, message: ''});
    const [isLoading_ZabbixHost, setIsLoading] = useState<Boolean>(false);

    const getZabbixHost = async (id: string) => {
        setIsLoading(true);
        setErrorMessageProps({error: false, message:''});

        const hostResponse: ZabbixHostResponse = await zabbixService.getHost(id);
        if (!hostResponse.success) {
            setErrorMessageProps({error: true, message: hostResponse.message});
        }
        setIsLoading(false);
        return hostResponse;
    }

    return {getZabbixHost, isLoading_ZabbixHost, errorMessage_ZabbixHost};
}

/**
 * useZabbixHosts for Zabbix
 * Method used in loading the data in the Route
 */
export const useZabbixHosts = () => {
    const [errorMessage_ZabbixHosts, setErrorMessageProps] = useState<ErrorMessage>({error: false, message: ''});
    const [isLoading_ZabbixHosts, setIsLoading] = useState<Boolean>(false);

    const getZabbixHosts = async () => {
        setIsLoading(true);
        setErrorMessageProps({error: false, message:''});

        const hostsResponse: ZabbixHostsResponse = await zabbixService.getHosts();
        if (!hostsResponse.success) {
            setErrorMessageProps({error: true, message: hostsResponse.message});
        }
        setIsLoading(false);
        return hostsResponse;
    }

    return {getZabbixHosts, isLoading_ZabbixHosts, errorMessage_ZabbixHosts};
}
