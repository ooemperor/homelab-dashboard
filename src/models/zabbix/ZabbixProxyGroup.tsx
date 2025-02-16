/**
 * Class for the type definition of the zabbix ProxyGroup object
 * https://www.zabbix.com/documentation/7.0/en/manual/api/reference/proxygroup/object
 * @author: ooemperor
 */

/**
 * Definiton of the ProxyGroup State enum
 */
export enum ZabbixProxyGroupStatus {
    unknown = "0",
    Offline = "1",
    Recovering = "2",
    Online = "3",
    Degrading = "4"
}

/**
 * Datatype definition of the zabbixProxyGroup
 */
export interface ZabbixProxyGroup {
    proxy_groupid: string,
    name: string,
    failover_delay: string,
    min_online: string,
    description: string,
    state: ZabbixProxyGroupStatus,
}

/**
 * Object used for the reponse of the zabbix service
 */
export interface ZabbixProxyGroupResponse {
    proxyGroup: ZabbixProxyGroup | null;
    success: boolean;
    message: string;
}


/**
 * Object used for the reponse of the zabbix service
 */
export interface ZabbixProxyGroupsResponse {
    proxyGroups: ZabbixProxyGroup[] | null;
    success: boolean;
    message: string;
}