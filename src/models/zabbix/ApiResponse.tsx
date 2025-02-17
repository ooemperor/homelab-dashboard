/**
 * Class for the type definition of the zabbix api response
 * @author: ooemperor
 */


/**
 * Definition of the type of zabbixApi Response
 */
export interface ZabbixApiResponse {
    jsonrpc: string,
    result?: any,
    error?: ZabbixApiError,
    id: number
}

/**
 * Definition of zabbix api error used in the response
 */
export interface ZabbixApiError {
    code: number,
    messsage: string,
    data: string
}

/**
 * Object used for the reponse of the zabbix service
 */
export interface ZabbixResponse {
    response: ZabbixApiResponse | null;
    success: boolean;
    message: string;
}