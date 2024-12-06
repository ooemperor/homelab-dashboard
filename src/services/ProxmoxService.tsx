'use client';
/**
 * Service Class for defining how to interact with a proxmox API
 * For more information about the proxmox api see:
 * https://pve.proxmox.com/pve-docs/api-viewer/index.html
 * @author ooemperor
 */
import {NodesResponse} from "../models/proxmox/Node";
import {config} from "../Config";

class ProxmoxService {
    apiToken: string | undefined;
    baseUrl: string | undefined;

    /**
     * Constructor of ProxmoxService
     * @param apiToken the token for authentication
     * @param baseUrl the base url for the proxmox server
     */
    constructor(apiToken: string | undefined, baseUrl: string | undefined) {
        this.apiToken = apiToken;
        this.baseUrl = baseUrl;
    }

    /**
     * Get method to get all Nodes of proxmox cluster
     */
    async getNodes(): Promise<NodesResponse> {
        let nodeResponse: any = {success: false, nodes: [], message: ''};

        try {
            const response: Response = await fetch(`${this.baseUrl}/api2/json/nodes`, {
                method: 'GET',
                headers: {'Content-Type': 'application/json', 'Authorization': this.apiToken || ""},
            });

            if (!response.ok) {
                nodeResponse.message = response.statusText;
                return nodeResponse;
            }
            const raw_json = await response.json();
            nodeResponse.nodes = await raw_json['data'];
            nodeResponse.success = true;
        } catch (error: any) {
            nodeResponse.message = error;
        }
        return nodeResponse;
    }
}

export const proxmoxService = new ProxmoxService(config.proxmoxApiKey, config.proxmoxApi);