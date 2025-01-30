/**
 * Class for the type definition of the Cluster State in proxmox
 * @author: ooemperor
 */


import {NodeStatus} from "./Node";

/**
 * enum of status of proxmox node
 */
export enum type {
    cluster = "cluster",
    node = "node"
}


/**
 * Type definition for the cluster status
 */
export interface Status{
    id: string;
    name: string;
    type: type;
    ip?: string;
    level?: string;
    local?: string;
    nodeid?: number;
    nodes?: number;
    online?: boolean;
    quorate?: boolean;
    version?: number;
}

/**
 * Response type for the state
 */
export interface StatusResponse {
    status?: Status[] | null;
    success: boolean;
    message: string;
}