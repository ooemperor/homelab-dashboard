/**
 * Defintions of Objects around LXC and VMs in proxmox
 * @author: ooemperor
 */

/**
 * enum of status of proxmox lxc
 */
export enum MachineStatus {
    stopped = "stopped",
    running = "running"
}

/**
 * Basic Data defintion of a machine that is later used for VMs and LXCs
 */
export interface Machine {
    node: string | null,
    vmid: number,
    status: MachineStatus,
    cpus: number | null,
    diskread: number | null,
    diskwrite: number | null,
    lock: string | null,
    maxdisk: number | null,
    maxmem: number | null,
    name: string | null,
    netin: number | null,
    netout: number | null,
    tags: string | null,
    template: boolean | null,
    uptime: number | null
}

/**
 * Data defintion extension of the Machine Interface for LXCs
 */
export interface LXC extends Machine {
    disk: number | null,
    maxswap: number | null
}

/**
 * Data defintion extension of the Machine Interface for VMs
 */
export interface VM extends Machine {
    pid: number | null,
    qmpstatus: string | null,
    running_machine: string | null,
    running_qemu: string | null
}

/**
 * Response type for multiple LXCs
 */
export interface LXCsResponse {
    lxcs: LXC[];
    success: boolean;
    message: string;
}

/**
 * Response type for single LXC
 */
export interface LXCResponse {
    lxc: LXC;
    success: boolean;
    message: string;
}

/**
 * Response type for multiple VMs
 */
export interface MachinesResponse {
    lxcs: Machine[];
    success: boolean;
    message: string;
}

/**
 * Response type for multiple VMs
 */
export interface VMsResponse {
    vms: VM[];
    success: boolean;
    message: string;
}

/**
 * Response type for single VM
 */
export interface VMResponse {
    vm: VM;
    success: boolean;
    message: string;
}