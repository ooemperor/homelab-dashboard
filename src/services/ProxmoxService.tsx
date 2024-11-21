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
        let nodeResponse: NodesResponse = {success: false, nodes: [], message: ''};

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

    /**
     * Gets all the ressources from the cluster
     * Will later be used to split it up more.
     * @param type the type of ressource we want to filter for
     */
    async getResources(type: string | null = null): Promise<any> {
        let resourceResponse: any = {success: false, nodes: [], message: ''};

        try {
            const response: Response = await fetch(`${this.baseUrl}/api2/json/cluster/resources`, {
                method: 'GET',
                headers: {'Content-Type': 'application/json', 'Authorization': this.apiToken || ""},
            });

            if (!response.ok) {
                resourceResponse.message = response.statusText;
                return resourceResponse;
            }
            const raw_json = await response.json();
            let process_json = await raw_json['data'];
            process_json = process_json.filter((resource: any) => resource.type.equal(type))
            resourceResponse.nodes = await raw_json['data'];
            resourceResponse.success = true;
        } catch (error: any) {
            resourceResponse.message = error;
        }
        return resourceResponse;
    }
}

export const proxmoxService = new ProxmoxService(config.proxmoxApiKey, config.proxmoxApi);