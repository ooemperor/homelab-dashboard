/**
 * File to define components for using with ZabbixProxy
 * @author ooemperor
 */
import {ZabbixProxyStatus} from "../../models/zabbix/ZabbixProxy";
import {StatusBadgeError, StatusBadgeSuccess} from "../StatusBadges";

/**
 * Function to render a Status Badge for a proxmox LXC
 * @param status
 * @constructor
 */
export default function ZabbixProxyStatusBadge(status: ZabbixProxyStatus) {
    if (status === ZabbixProxyStatus.Online) {
        return StatusBadgeSuccess("Online");
    } else if (status === ZabbixProxyStatus.Offline) {
        return StatusBadgeError("Offline");
    } else {
        return StatusBadgeSuccess("Unknown");
    }
}
