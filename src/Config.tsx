/**
 * Config file for the Dashboard project
 * Reads the config out of the .env file
 * @author ooemperor
 */

/**
 * Class for the config object used in total
 */
export class Config{
    proxmoxApi: string | undefined;
    proxmoxApiKey: string | undefined;
    zabbixApi: string | undefined;
    zabbixApiKey: string | undefined;
    haproxyApi: string | undefined;

    /**
     * Constructor of the config
     */
    constructor() {

        this.proxmoxApi = process.env.REACT_APP_PROXMOX_API;
        this.proxmoxApiKey = process.env.REACT_APP_PROXMOX_API_KEY;

        this.zabbixApi = process.env.REACT_APP_ZABBIX_API;
        this.zabbixApiKey = process.env.REACT_APP_ZABBIX_API_KEY;

        this.haproxyApi = process.env.REACT_APP_HAPROXY_API;
    }
}

export const config = new Config();