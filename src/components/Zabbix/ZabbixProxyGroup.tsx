/**
 * File to define components for using with ZabbixProxyGroup
 * @author ooemperor
 */
import {ZabbixProxyGroupStatus} from "../../models/zabbix/ZabbixProxyGroup";
import {StatusBadgeError, StatusBadgeSuccess, StatusBadgeWarning} from "../StatusBadges";

/**
 * Function to render a Status Badge for a proxmox LXC
 * @param status
 * @constructor
 */
export default function ZabbixProxyGroupStatusBadge(status: ZabbixProxyGroupStatus) {
    if (status === ZabbixProxyGroupStatus.Online) {
        return StatusBadgeSuccess("Online");
    } else if (status === ZabbixProxyGroupStatus.Offline) {
        return StatusBadgeError("Offline");
    } else if (status === ZabbixProxyGroupStatus.Degrading) {
        return StatusBadgeError("Degrading");
    } else if (status === ZabbixProxyGroupStatus.Recovering) {
        return StatusBadgeWarning("Recovering");
    } else {
        return StatusBadgeError("Unknown");
    }
}