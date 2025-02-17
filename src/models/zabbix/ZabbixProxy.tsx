/**
 * Class for the type definition of the zabbix proxy object
 * https://www.zabbix.com/documentation/7.0/en/manual/api/reference/proxy/object
 * @author: ooemperor
 */

/**
 * Definition of the ZabbixProxy state
 */
export enum ZabbixProxyStatus {
    unknown = "0",
    Offline = "1",
    Online = "2"
}

/**
 * Definition of the zabbix proxy object
 */
export interface ZabbixProxy {
    proxyid: string,
    proxy_groupid: string,
    name: string,
    address: string,
    local_address: string,
    port: string,
    local_port: string,
    version: string,
    state: ZabbixProxyStatus
}

/**
 * Object used for the reponse of the zabbix service
 */
export interface ZabbixProxyResponse {
    proxy: ZabbixProxy | null;
    success: boolean;
    message: string;
}


/**
 * Object used for the reponse of the zabbix service
 */
export interface ZabbixProxiesResponse {
    proxies: ZabbixProxy[] | null;
    success: boolean;
    message: string;
}