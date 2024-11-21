'use client';
/**
 * Service Class for defining how to interact with a proxmox API
 * For more information about the proxmox api see:
 * https://pve.proxmox.com/pve-docs/api-viewer/index.html
 * @author ooemperor
 */
import {NodesResponse} from "../models/proxmox/Node";
import {config} from "../Config";
import {LXCResponse, LXCsResponse, MachinesResponse, VMsResponse} from "../models/proxmox/Machines";
import * as VM from "node:vm";

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
        let resourceResponse: any = {success: false, resources: [], message: ''};

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
            if (type !== null){
                process_json = await process_json.filter((resource: any) => resource.type === type)

            }

            resourceResponse.resources = await process_json;
            resourceResponse.success = true;
        } catch (error: any) {
            resourceResponse.message = error;
        }
        return resourceResponse;
    }

    /**
     * Method to get all the LXCs
     */
    async getLXCs(): Promise<LXCsResponse> {
        let lxcsResponse: LXCsResponse = {success: false, lxcs: [], message: ''};
        const resourceResponse: any =  await this.getResources('lxc');
        lxcsResponse.success = resourceResponse.success;
        lxcsResponse.message = resourceResponse.message;
        lxcsResponse.lxcs = resourceResponse.resources;
        return lxcsResponse;
    }

    /**
     * Method to get all the VMs
     */
    async getVMs(): Promise<VMsResponse> {
        let vmsResponse: VMsResponse = {success: false, vms: [], message: ''};
        const resourceResponse: any =  await this.getResources('qemu');
        vmsResponse.success = resourceResponse.success;
        vmsResponse.message = resourceResponse.message;
        vmsResponse.vms = resourceResponse.resources;
        return vmsResponse;
    }
}

export const proxmoxService = new ProxmoxService(config.proxmoxApiKey, config.proxmoxApi);