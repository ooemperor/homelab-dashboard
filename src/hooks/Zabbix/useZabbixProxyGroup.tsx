/**
 * useZabbixProxyGroup / useZabbixProxyGroups
 * File for hooks about Zabbix Proxy
 * @author: ooemperor
 */
import {useState} from "react";
import {ErrorMessage} from "../../models/ErrorMessage";
import {zabbixService} from "../../services/ZabbixService";
import {ZabbixProxiesResponse, ZabbixProxyResponse} from "../../models/zabbix/ZabbixProxy";
import {
    ZabbixProxyGroup,
    ZabbixProxyGroupResponse,
    ZabbixProxyGroupsResponse
} from "../../models/zabbix/ZabbixProxyGroup";

/**
 * useZabbixProxyGroup for Zabbix
 * Method used in loading the data in the Route
 */
export const useZabbixProxyGroup = () => {
    const [errorMessage_ZabbixProxyGroup, setErrorMessageProps] = useState<ErrorMessage>({error: false, message: ''});
    const [isLoading_ZabbixProxyGroup, setIsLoading] = useState<Boolean>(false);

    const getZabbixProxyGroup = async (id: string) => {
        setIsLoading(true);
        setErrorMessageProps({error: false, message:''});

        const proxyGroupResponse: ZabbixProxyGroupResponse = await zabbixService.getProxyGroup(id);
        if (!proxyGroupResponse.success) {
            setErrorMessageProps({error: true, message: proxyGroupResponse.message});
        }
        setIsLoading(false);
        return proxyGroupResponse;
    }

    return {getZabbixProxyGroup, errorMessage_ZabbixProxyGroup, isLoading_ZabbixProxyGroup};
}

/**
 * useZabbixProxyGroups for Zabbix
 * Method used in loading the data in the Route
 */
export const useZabbixProxyGroups = () => {
    const [errorMessage_ZabbixProxyGroups, setErrorMessageProps] = useState<ErrorMessage>({error: false, message: ''});
    const [isLoading_ZabbixProxyGroups, setIsLoading] = useState<Boolean>(false);

    const getZabbixProxyGroups = async () => {
        setIsLoading(true);
        setErrorMessageProps({error: false, message:''});

        const proxiesResponse: ZabbixProxyGroupsResponse = await zabbixService.getProxyGroups();
        if (!proxiesResponse.success) {
            setErrorMessageProps({error: true, message: proxiesResponse.message});
        }
        setIsLoading(false);
        return proxiesResponse;
    }

    return {getZabbixProxyGroups, errorMessage_ZabbixProxyGroups, isLoading_ZabbixProxyGroups};
}
