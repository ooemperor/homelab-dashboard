/**
 * Defintions of Objects around node/s in proxmox
 * @author: ooemperor
 */
/**
 * enum of status of proxmox node
 */
export enum NodeStatus {
    unknown = "unknown",
    online = "online",
    offline = "offline"
}

/**
 * Data defintion for a node in proxmox
 */
export interface Node {
    node: string,
    status: NodeStatus,
    cpu: number | null,
    level: string | null,
    maxcpu: number,
    maxmem: number,
    mem: number | null,
    uptime: number | null
}

/**
 * Response type for multiple nodes
 */
export interface NodesResponse {
    nodes: Node[];
    success: boolean;
    message: string;
}

/**
 * Response type for single node
 */
export interface NodeResponse {
    node: Node | null;
    success: boolean;
    message: string;
}