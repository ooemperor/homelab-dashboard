'use client';
/**
 * Service Class for defining how to interact with a proxmox API
 * For more information about the proxmox api see:
 * https://pve.proxmox.com/pve-docs/api-viewer/index.html
 * @author ooemperor
 */
import {NodeResponse, NodesResponse} from "../models/proxmox/Node";
import {config} from "../Config";
import {LXCResponse, LXCsResponse, VMResponse, VMsResponse} from "../models/proxmox/Machines";
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
     * Get method to get the information about a single node in the proxmos cluster
     * @param name The name of the node
     * @type name string
     */
    async getNode(name: string): Promise<NodeResponse> {
        let nodeResponse: NodeResponse = {success: false, node: null, message: ''};

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
            console.log(raw_json);
            nodeResponse.node = await raw_json['data'][0];
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
     * @type type string | null
     * @param name The name of the ressource we want to filter or
     * @type name string | null
     */
    async getResources(type: string | null = null, name: string | null = null): Promise<any> {
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
            if (type !== null) {
                process_json = await process_json.filter((resource: any) => resource.type === type)
            }

            if (name !== null) {
                process_json = await process_json.filter((resource: any) => resource.name === name);
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
        const resourceResponse: any = await this.getResources('lxc');
        lxcsResponse.success = resourceResponse.success;
        lxcsResponse.message = resourceResponse.message;
        lxcsResponse.lxcs = resourceResponse.resources;
        return lxcsResponse;
    }

    /**
     * Method to get resources for a sinlge LXC
     */
    async getLXC(name: string): Promise<LXCResponse> {
        let lxcResponse: LXCResponse = {success: false, lxc: null, message: ''};
        const resourceResponse: any = await this.getResources('lxc', name);
        lxcResponse.success = resourceResponse.success;
        lxcResponse.message = resourceResponse.message;
        lxcResponse.lxc = resourceResponse.resources[0];
        return lxcResponse;
    }

    /**
     * Method to get all the VMs
     */
    async getVMs(): Promise<VMsResponse> {
        let vmsResponse: VMsResponse = {success: false, vms: [], message: ''};
        const resourceResponse: any = await this.getResources('qemu');
        vmsResponse.success = resourceResponse.success;
        vmsResponse.message = resourceResponse.message;
        vmsResponse.vms = resourceResponse.resources;
        return vmsResponse;
    }

    /**
     * Method to get resources for a single VM
     * @param name The name of the VM
     * @type name string
     */
    async getVM(name: string): Promise<VMResponse> {
        let vmResponse: VMResponse = {success: false, vm: null, message: ''};
        const resourceResponse: any = await this.getResources('qemu', name);
        vmResponse.success = resourceResponse.success;
        vmResponse.message = resourceResponse.message;
        vmResponse.vm = resourceResponse.resources[0];
        return vmResponse;
    }
}

export const proxmoxService = new ProxmoxService(config.proxmoxApiKey, config.proxmoxApi);