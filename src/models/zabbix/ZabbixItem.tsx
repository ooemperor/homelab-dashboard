/**
 * Class for the type definition of the zabbix item object
 * https://www.zabbix.com/documentation/7.0/en/manual/api/reference/item/object
 * @author: ooemperor
 */

/**
 * enum definition of the zabbix item status
 */
export enum ZabbixItemStatus {
    enabled = "0",
    disabled =  "1"
}

/**
 * enum for the Zabbix Item Type
 */
export enum ZabbixItemType {
    Zabbix_Agent = "0",
    Zabbix_Trapper = "2",
    Simple_Check = "3",
    Zabbix_Internal = "5",
    Zabbix_Agent_Active = "7",
    Web_Item = "9",
    External_Check = "10",
    Database_Monitor = "11",
    IMPI_Agent = "12",
    SSH_Agent = "13",
    TELNET_Agent = "14",
    Calculated = "15",
    JMX_Agent = "16",
    SNMP_Trap = "17",
    Dependent_Item = "18",
    HTTP_Agent = "19",
    SNMP_Agent = "20",
    Script = "21",
    Browser = "22"
}


/**
 * Datatype definition of the zabbix Item
 */
export interface ZabbixItem {
    itemid: string,
    type: ZabbixItemType,
    hostid: string,
    name: string,
    key_: string,
    delay: string,
    history: string,
    trends: string,
    status: ZabbixItemStatus,
    lastns: string,
    lastvalue: string,
    prevvalue: string
}

/**
 * Object used for the reponse of the zabbix service
 */
export interface ZabbixItemResponse {
    item: ZabbixItem | null;
    success: boolean;
    message: string;
}


/**
 * Object used for the reponse of the zabbix service
 */
export interface ZabbixItemsResponse {
    items: ZabbixItem[] | null;
    success: boolean;
    message: string;
}