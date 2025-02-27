import {HAProxyStatsStatus} from "../../models/haproxy/HAProxyStatsResponse";
import {StatusBadgeError, StatusBadgeSuccess} from "../StatusBadges";

/**
 * Function to render a Status Badge for a haproxy LXC
 * @param status The state of the HAProxyResource
 * @constructor
 */
export default function HAProxyStatusBadge(status: HAProxyStatsStatus) {
    if (status === HAProxyStatsStatus.online || status === HAProxyStatsStatus.frontend) {
        return StatusBadgeSuccess(status);
    } else {
        return StatusBadgeError(status);
    }
}