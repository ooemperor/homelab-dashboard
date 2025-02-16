/**
 * useZabbixProxy / useZabbixProxies
 * File for hooks about Zabbix Proxy
 * @author: ooemperor
 */
import {useState} from "react";
import {ErrorMessage} from "../../models/ErrorMessage";
import {zabbixService} from "../../services/ZabbixService";
import {ZabbixProxiesResponse, ZabbixProxyResponse} from "../../models/zabbix/ZabbixProxy";

/**
 * useZabbixProxy for Zabbix
 * Method used in loading the data in the Route
 */
export const useZabbixProxy = (id: string) => {
    const [errorMessage_ZabbixProxy, setErrorMessageProps] = useState<ErrorMessage>({error: false, message: ''});
    const [isLoading_ZabbixProxy, setIsLoading] = useState<Boolean>(false);

    const getZabbixProxy = async () => {
        setIsLoading(true);
        setErrorMessageProps({error: false, message:''});

        const proxyResponse: ZabbixProxyResponse = await zabbixService.getProxy(id);
        if (!proxyResponse.success) {
            setErrorMessageProps({error: true, message: proxyResponse.message});
        }
        setIsLoading(false);
        return proxyResponse;
    }

    return {getZabbixProxy, errorMessage_ZabbixProxy, isLoading_ZabbixProxy};
}

/**
 * useZabbixProxies for Zabbix
 * Method used in loading the data in the Route
 */
export const useZabbixProxies = () => {
    const [errorMessage_ZabbixProxies, setErrorMessageProps] = useState<ErrorMessage>({error: false, message: ''});
    const [isLoading_ZabbixProxies, setIsLoading] = useState<Boolean>(false);

    const getZabbixProxies = async () => {
        setIsLoading(true);
        setErrorMessageProps({error: false, message:''});

        const proxiesResponse: ZabbixProxiesResponse = await zabbixService.getProxies();
        if (!proxiesResponse.success) {
            setErrorMessageProps({error: true, message: proxiesResponse.message});
        }
        setIsLoading(false);
        return proxiesResponse;
    }

    return {getZabbixProxies, errorMessage_ZabbixProxies, isLoading_ZabbixProxies};
}
