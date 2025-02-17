/**
 * Rendering of the Zabbix Hosts view for a multiple Hosts
 * @author ooemperor
 */

import React, {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import {ZabbixHost} from "../../../models/zabbix/ZabbixHost";
import {useZabbixHosts} from "../../../hooks/Zabbix/useZabbixHosts";
import {useZabbixProxies} from "../../../hooks/Zabbix/useZabbixProxy";
import {useZabbixProxyGroups} from "../../../hooks/Zabbix/useZabbixProxyGroup";
import {ZabbixProxy} from "../../../models/zabbix/ZabbixProxy";
import {ZabbixProxyGroup} from "../../../models/zabbix/ZabbixProxyGroup";
import ZabbixHostStatusBadge from "../../../components/Zabbix/ZabbixHost";

export default function ZabbixHosts() {

    const {getZabbixHosts, errorMessage_ZabbixHosts, isLoading_ZabbixHosts} = useZabbixHosts();
    const {getZabbixProxies, errorMessage_ZabbixProxies, isLoading_ZabbixProxies} = useZabbixProxies();
    const {getZabbixProxyGroups, errorMessage_ZabbixProxyGroups, isLoading_ZabbixProxyGroups} = useZabbixProxyGroups();

    const [hosts, setHosts] = useState<ZabbixHost[]>([]);
    const [proxies, setProxies] = useState<ZabbixProxy[]>([]);
    const [proxygroups, setProxyGroups] = useState<ZabbixProxyGroup[]>([]);

    const navigate = useNavigate();
    useEffect(() => {
        //loading hosts
        const loadHosts = async () => {
            const hostsData = await getZabbixHosts();
            if (hostsData.hosts === null){
                setHosts([]);
            } else {
                setHosts(hostsData.hosts);
            }

        }

        //loading information about the proxies
        const loadProxies = async () => {
            const proxyData = await getZabbixProxies();
            if (proxyData.proxies === null){
                setProxies([]);
            } else {
                setProxies(proxyData.proxies);
            }

        }

        // loading information about the proxygroups
        const loadProxyGroups = async () => {
            const proxyGroupData = await getZabbixProxyGroups();
            if (proxyGroupData.proxyGroups === null){
                setProxyGroups([]);
            } else {
                setProxyGroups(proxyGroupData.proxyGroups);
            }

        }

        loadHosts();
        loadProxies();
        loadProxyGroups()

    }, []);

    function getProxyName(proxyId: string): string {
        const proxy = proxies.find((element) => element.proxyid === proxyId);
        if (proxy === undefined){
            return ""
        }
        else {
            return proxy.name
        }
    }

    function getProxyGroupName(proxyGroupId: string): string {
        const proxygroup = proxygroups.find((element) => element.proxy_groupid === proxyGroupId);
        if (proxygroup === undefined){
            return ""
        }
        else {
            return proxygroup.name
        }
    }

    return (
        <div className="container">
            <div className={"row"}>
                <div className="col">
                    <h1>Host's</h1>
                </div>
            </div>
            <div className="row">
                <div className="col">
                    <table className="table table-hover">
                        <thead>
                        <tr>
                            <th>Host</th>
                            <th>State</th>
                            <th>Proxy</th>
                            <th>ProxyGroup</th>
                        </tr>
                        </thead>
                        <tbody>
                        {isLoading_ZabbixHosts ? <p>Loading...</p> : null}
                        {isLoading_ZabbixProxies ? null : null}
                        {isLoading_ZabbixProxyGroups ? null : null}
                        {errorMessage_ZabbixHosts.error ? <p>{errorMessage_ZabbixHosts.message}</p> : null}
                        {!isLoading_ZabbixHosts && hosts.sort((a, b) => a.host > b.host ? 1 : -1).map((host) => (
                            <tr className="clickable-row" key={host.host} onClick={() => {
                                navigate(`/zabbix/host/${host.hostid}`)
                            }}>
                                <td>{host.host}</td>
                                <td>{ZabbixHostStatusBadge(host.status)}</td>
                                <td>{host.proxyid === "0" ? "" : getProxyName(host.proxyid)}</td>
                                <td>{host.proxy_groupid === "0" ? "" : getProxyGroupName(host.proxy_groupid)}</td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}