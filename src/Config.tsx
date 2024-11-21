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

    /**
     * Constructor of the config
     */
    constructor() {

        this.proxmoxApi = process.env.REACT_APP_PROXMOX_API;
        this.proxmoxApiKey = process.env.REACT_APP_PROXMOX_API_KEY;
    }
}

export const config = new Config();