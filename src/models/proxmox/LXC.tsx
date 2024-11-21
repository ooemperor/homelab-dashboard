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