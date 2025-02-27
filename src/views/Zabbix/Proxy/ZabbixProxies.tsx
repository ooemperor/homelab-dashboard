/**
 * Rendering of the Zabbix Hosts view for a multiple Proxies
 * @author ooemperor
 */

import React, {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import {useZabbixProxies} from "../../../hooks/Zabbix/useZabbixProxy";
import {useZabbixProxyGroups} from "../../../hooks/Zabbix/useZabbixProxyGroup";
import {ZabbixProxy} from "../../../models/zabbix/ZabbixProxy";
import {ZabbixProxyGroup} from "../../../models/zabbix/ZabbixProxyGroup";
import ZabbixProxyStatusBadge from "../../../components/Zabbix/ZabbixProxy";

export default function ZabbixProxies() {

    const {getZabbixProxies, errorMessage_ZabbixProxies, isLoading_ZabbixProxies} = useZabbixProxies();
    const {getZabbixProxyGroups, errorMessage_ZabbixProxyGroups, isLoading_ZabbixProxyGroups} = useZabbixProxyGroups();


    const [proxies, setProxies] = useState<ZabbixProxy[]>([]);
    const [proxygroups, setProxyGroups] = useState<ZabbixProxyGroup[]>([]);

    const navigate = useNavigate();
    useEffect(() => {

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

        loadProxies();
        loadProxyGroups()

    }, []);

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
                    <h1>Proxies</h1>
                </div>
            </div>
            <div className="row">
                <div className="col">
                    <table className="table table-hover">
                        <thead>
                        <tr>
                            <th>Proxy</th>
                            <th>State</th>
                            <th>ProxyGroup</th>
                        </tr>
                        </thead>
                        <tbody>
                        {isLoading_ZabbixProxies ? null : null}
                        {isLoading_ZabbixProxyGroups ? null : null}
                        {errorMessage_ZabbixProxies.error ? <p>{errorMessage_ZabbixProxies.message}</p> : null}
                        {!isLoading_ZabbixProxies && proxies.sort((a, b) => a.name > b.name ? 1 : -1).map((proxy) => (
                            <tr className="clickable-row" key={proxy.name} onClick={() => {
                                navigate(`/zabbix/proxy/${proxy.proxyid}`)
                            }}>
                                <td>{proxy.name}</td>
                                <td>{ZabbixProxyStatusBadge(proxy.state)}</td>
                                <td>{proxy.proxy_groupid === "0" ? "" : getProxyGroupName(proxy.proxy_groupid)}</td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}