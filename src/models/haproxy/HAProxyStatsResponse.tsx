/**
 * Class for the type definition of the haproxy stats
 * @author: ooemperor
 */

/**
 * Enum for the the proxy state definition
 */
export enum HAProxyStatsStatus {
    online = "UP",
    offline = "DOWN",
    frontend = "OPEN"

}

/**
 * Datatype definition of the HAProxyStatsResponseItem
 */
export interface HaProxyStatItem {
    pxname: string,
    svname: string ,
    bck: number, // number of backup servers
    act: number, // number of active servers or if the server is active or not
    status: HAProxyStatsStatus, // status of the ressource
    weight: number, // weight for the laodbalancing part
    qtime: number, //time in ms how long connection stayed open over the last 1024 connections
    qcur: number, //unnassigned requests
    rtime: number, // response times in ms
    check_status: string // status of last health check L4 - L7 OK are good values
    req_rate: number, // number of requests per second
    req_rate_max: number, // number of requests per second at its maximum
    scur: number, // established sessions
    slim: number, // sessions limits
    qlimit: number// configured maxqueue
}

export interface HaProxyStatsResponse {
    response: HaProxyStatItem[] | null;
    success: boolean;
    message: string;
}