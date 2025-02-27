/**
 * File to define components for using with LXC
 * @author ooemperor
 */
import {MachineStatus} from "../../models/proxmox/Machines";
import {StatusBadgeError, StatusBadgeSuccess} from "../StatusBadges";


/**
 * Function to render a Status Badge for a proxmox LXC
 * @param status
 * @constructor
 */
export default function MachineStatusBadge(status: MachineStatus) {
    if (status === MachineStatus.running) {
        return StatusBadgeSuccess(status);
    } else {
        return StatusBadgeError(status);
    }
}

