/**
 * Class for the type definition of the zabbix hosts object
 * https://www.zabbix.com/documentation/7.0/en/manual/api/reference/host/object
 * @author: ooemperor
 */

/**
 * enum definition of the zabbix host status
 */
export enum ZabbixHostStatus {
    enabled = "0",
    disabled =  "1"
}

/**Data definition for the zabbix host object
 */
export interface ZabbixHost {
    hostid: string,
    proxyid: string,
    proxy_groupid: string,
    monitored_by: string,
    assigned_proxyid: string,
    description: string,
    host: string,
    status: ZabbixHostStatus,
}

/**
 * Object used for the reponse of the zabbix service
 */
export interface ZabbixHostResponse {
    host: ZabbixHost | null;
    success: boolean;
    message: string;
}


/**
 * Object used for the reponse of the zabbix service
 */
export interface ZabbixHostsResponse {
    hosts: ZabbixHost[] | null;
    success: boolean;
    message: string;
}