/**
 * Defintions of Objects around LXC in proxmox
 * @author: ooemperor
 */

/**
 * enum of status of proxmox lxc
 */
export enum LXCStatus {
    stopped = "stopped",
    running = "running"
}

/**
 * Data defintion for a lxc in proxmox
 */
export interface LXC {
    vmid: number,
    status: LXCStatus,
    cpus: number | null,
    disk: number | null,
    diskread: number | null,
    diskwrite: number | null,
    lock: string | null,
    maxdisk: number | null,
    maxmem: number | null,
    maxswap: number | null,
    name: string | null,
    netin: number | null,
    netout: number | null,
    tags: string | null,
    template: boolean | null,
    uptime: number | null
}

/**
 * Response type for multiple nodes
 */
export interface LXCsResponse {
    lxcs: LXC[];
    success: boolean;
    message: string;
}

/**
 * Response type for single node
 */
export interface LXCResponse {
    lxc: LXC;
    success: boolean;
    message: string;
}