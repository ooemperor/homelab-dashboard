'use client';
/**
 * Service Class for defining how to interat with a proxmox API
 * For more information about the proxmox api see:
 * https://www.zabbix.com/documentation/7.0/en/manual/api
 * @author ooemperor
 */
import {config} from "../Config";
import {ZabbixResponse} from "../models/zabbix/ApiResponse";
import {ZabbixHostResponse, ZabbixHostsResponse} from "../models/zabbix/ZabbixHost";
import {ZabbixProxiesResponse, ZabbixProxyResponse} from "../models/zabbix/ZabbixProxy";
import {ZabbixProxyGroupResponse, ZabbixProxyGroupsResponse} from "../models/zabbix/ZabbixProxyGroup";
import {ZabbixItemResponse, ZabbixItemsResponse} from "../models/zabbix/ZabbixItem";

export class ZabbixService {
    apiToken: string | undefined;
    baseUrl: string | undefined;

    /**
     * Constructor of the Zabbix Service Class
     * @param apiToken the token for authentication in zabbix
     * @param baseUrl the base url for the zabbix server
     */
    constructor(apiToken: string | undefined, baseUrl: string | undefined) {
        this.apiToken = apiToken;
        this.baseUrl = baseUrl;
    }

    /**
     * Basic function to execute an ApiCall to the Zabbix Server
     * @param body the body to send to the api
     * @private
     */
    private async executeApiCall(body: any): Promise<ZabbixResponse> {
        let zabbixResponse: ZabbixResponse = {success: false, response: null, message: ''};
        try {
            const response: Response = await fetch(`${this.baseUrl}`, {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify(body)
            })

            if (!response.ok) {
                zabbixResponse.message = response.statusText;
                return zabbixResponse;
            }

            const raw_json = await response.json();
            if (raw_json.error != null) {
                zabbixResponse.message = raw_json.error.message + " " + raw_json.data.data;
                return zabbixResponse;
            }

            zabbixResponse.response = raw_json;
            zabbixResponse.success = true;
            return zabbixResponse;
        } catch (error: any) {
            console.log(error);
        }
        return zabbixResponse;
    }

    /**
     * Prepare and return the body for the execution of a api call to zabbix
     * @param object the resource you want to access (e.g. host)
     * @param method what you want to do on the ressource (e.g. get)
     * @param additional_params any datatype for passing additional params to the body constructor
     * @param unsupported boolean flag for filtering items
     * @param count flag to determine if the output should be counted or not
     * @private
     */
    private prepareBody(object: string, method: string, additional_params: any = null, unsupported: boolean = false, count: boolean = false) {
        let baseBody =  {
            "jsonrpc": "2.0",
            "method": `${object}.${method}`,
            "params": {
                "output": "extend",
                "filter": {}
            },
            "id": 2,
            "auth": this.apiToken,
        }

        // if only unsupported items want to be seen
        if (unsupported && object === "item") {
            baseBody.params.filter = {
                "state": 1,
                "status": 0
            }
        }

        // if the output should be counted or not
        if (count) {
            // @ts-ignore
            baseBody.params["countOutput"] = "1"
        }

        if (additional_params !== null) {
            for (let key in additional_params) {
                // @ts-ignore
                baseBody.params[key] = additional_params[key];
            }
        }

        return baseBody
    }

    /**
     * Function to fetch all hosts from Zabbix API
     */
    async getHosts(): Promise<ZabbixHostsResponse> {
        let hostsResponse: ZabbixHostsResponse = {success: false, hosts: [], message: ''};
        const body = this.prepareBody("host", "get")

        const genericResponse = await this.executeApiCall(body);
        hostsResponse.success = genericResponse.success;
        hostsResponse.message = genericResponse.message;
        if (genericResponse.response != null) {
            hostsResponse.hosts = genericResponse.response.result;
        }
        return hostsResponse;
    }

    /**
     * Function to fetch all hosts from Zabbix API
     * @param id The identifier of the host
     */
    async getHost(id: string): Promise<ZabbixHostResponse> {
        let hostResponse: ZabbixHostResponse = {success: false, host: null, message: ''};
        const filters = {"hostids": [id]}
        const body = this.prepareBody("host", "get", filters)

        const genericResponse = await this.executeApiCall(body);
        hostResponse.success = genericResponse.success;
        hostResponse.message = genericResponse.message;
        if (genericResponse.response != null) {
            hostResponse.host = genericResponse.response.result[0];
        }
        return hostResponse;
    }

    /**
     * Function to fetch all Proxy from Zabbix API
     */
    async getProxies(): Promise<ZabbixProxiesResponse> {
        let proxiesResponse: ZabbixProxiesResponse = {success: false, proxies: [], message: ''};
        const body = this.prepareBody("proxy", "get")
        const genericResponse = await this.executeApiCall(body);
        proxiesResponse.success = genericResponse.success;
        proxiesResponse.message = genericResponse.message;
        if (genericResponse.response != null) {
            proxiesResponse.proxies = genericResponse.response.result;
        }
        return proxiesResponse;
    }

    /**
     * Function to fetch  Proxy from Zabbix API
     * @param id The identifier of the proxy
     */
    async getProxy(id: string): Promise<ZabbixProxyResponse> {
        let proxyResponse: ZabbixProxyResponse = {success: false, proxy: null, message: ''};
        const filters = {"proxyids": [id]}
        const body = this.prepareBody("proxy", "get", filters);
        const genericResponse = await this.executeApiCall(body);
        proxyResponse.success = genericResponse.success;
        proxyResponse.message = genericResponse.message;
        if (genericResponse.response != null) {
            proxyResponse.proxy = genericResponse.response.result[0];
        }
        return proxyResponse;
    }

    /**
     * Function to fetch all ProxyGroups from Zabbix API
     */
    async getProxyGroups(): Promise<ZabbixProxyGroupsResponse> {
        let proxyGroupsResponse: ZabbixProxyGroupsResponse = {success: false, proxyGroups: [], message: ''};
        const body = this.prepareBody("proxygroup", "get")
        const genericResponse = await this.executeApiCall(body);
        proxyGroupsResponse.success = genericResponse.success;
        proxyGroupsResponse.message = genericResponse.message;
        if (genericResponse.response != null) {
            proxyGroupsResponse.proxyGroups = genericResponse.response.result;
        }
        return proxyGroupsResponse;
    }

    /**
     * Function to fetch a single ProxyGroups from Zabbix API
     * @param id The identifier of the proxy group
     */
    async getProxyGroup(id: string): Promise<ZabbixProxyGroupResponse> {
        let proxyGroupResponse: ZabbixProxyGroupResponse = {success: false, proxyGroup: null, message: ''};
        const filters = {"proxy_groupids": [id]}
        const body = this.prepareBody("proxygroup", "get", filters);
        const genericResponse = await this.executeApiCall(body);
        proxyGroupResponse.success = genericResponse.success;
        proxyGroupResponse.message = genericResponse.message;
        if (genericResponse.response != null) {
            proxyGroupResponse.proxyGroup = genericResponse.response.result[0];
        }
        return proxyGroupResponse;
    }

    /**
     * Function to fetch all items from Zabbix
     * @param additional_params any datatype for passing additional params to the body constructor
     * @param unsupported Flag to only select unsupported items or not
     * @param count Flag to indicate if the output should be counted or not
     */
    async getItems(additional_params: any = null, unsupported: boolean = false, count: boolean = false): Promise<ZabbixItemsResponse> {
        let itemsResponse: ZabbixItemsResponse = {success: false, items: [], message: ''};
        const body = this.prepareBody("item", "get", additional_params)
        const genericResponse = await this.executeApiCall(body);
        itemsResponse.success = genericResponse.success;
        itemsResponse.message = genericResponse.message;
        if (genericResponse.response != null) {
            itemsResponse.items = genericResponse.response.result;
        }
        return itemsResponse;
    }

    /**
     * Function to fetch some itemsallItems
     * @param id The identifier of the item
     * @param unsupported if it should query for unsupported items or not
     */
    async getItem(id: string, unsupported: boolean = false): Promise<ZabbixItemResponse> {
        let itemResponse: ZabbixItemResponse = {success: false, item: null, message: ''};
        const filters = {"itemids": [id]}
        const body = this.prepareBody("item", "get", filters);

        const genericResponse = await this.executeApiCall(body);
        itemResponse.success = genericResponse.success;
        itemResponse.message = genericResponse.message;
        if (genericResponse.response != null) {
            itemResponse.item = genericResponse.response.result[0];
        }
        return itemResponse;
    }
}

export const zabbixService = new ZabbixService(config.zabbixApiKey, config.zabbixApi);