'use client';
/**
 * Service Class for defining how to interat with a proxmox API
 * For more information about the proxmox api see:
 * https://www.zabbix.com/documentation/7.0/en/manual/api
 * @author ooemperor
 */
import {config} from "../Config";

class ZabbixService {
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

    private async executeApiCall(body: any): Promise<Response | null> {
        try {
            const response: Response = await fetch(`${this.baseUrl}`, {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify(body)
            })
            return response;
        }
        catch (error: any) {
            console.log(error);
        }
        return null;

    }


    async getHosts(): Promise<any> {
        const host_body = {
            "jsonrpc": "2.0",
            "method": "host.get",
            "params": {
                "output": "extend"
            },
            "id": 2,
            "auth": this.apiToken,
        }
        return await this.executeApiCall(host_body);

    }


}

export const zabbixService = new ZabbixService(config.zabbixApiKey, config.zabbixApi);