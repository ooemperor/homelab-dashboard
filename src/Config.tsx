/**
 * Config file for the Dashboard project
 * Reads the config out of the .env file
 * @author ooemperor
 */
import configData from "./config.sec.json"

/**
 * Class for the config object used in total
 */
export class Config{
    proxmoxApi: string;
    proxmoxApiKey: string;

    /**
     * Constructor of the config
     */
    constructor() {

        this.proxmoxApi = configData.proxmox.api;
        this.proxmoxApiKey = configData.proxmox.apiKey;
    }
}

export const config = new Config();