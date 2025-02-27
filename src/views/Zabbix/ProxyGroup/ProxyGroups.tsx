/**
 * Rendering of the Zabbix Hosts view for a multiple Proxies
 * @author ooemperor
 */

import React, {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import {useZabbixProxies} from "../../../hooks/Zabbix/useZabbixProxy";
import {useZabbixProxyGroups} from "../../../hooks/Zabbix/useZabbixProxyGroup";
import {ZabbixProxy} from "../../../models/zabbix/ZabbixProxy";
import {ZabbixProxyGroup, ZabbixProxyGroupStatus} from "../../../models/zabbix/ZabbixProxyGroup";
import ZabbixProxyStatusBadge from "../../../components/Zabbix/ZabbixProxy";
import ZabbixProxyGroupStatusBadge from "../../../components/Zabbix/ZabbixProxyGroup";

export default function ZabbixProxyGroups() {

    const {getZabbixProxyGroups, errorMessage_ZabbixProxyGroups, isLoading_ZabbixProxyGroups} = useZabbixProxyGroups();


    const [proxyGroups, setProxyGroups] = useState<ZabbixProxyGroup[]>([]);

    const navigate = useNavigate();
    useEffect(() => {

        // loading information about the proxygroups
        const loadProxyGroups = async () => {
            const proxyGroupData = await getZabbixProxyGroups();
            if (proxyGroupData.proxyGroups === null){
                setProxyGroups([]);
            } else {
                setProxyGroups(proxyGroupData.proxyGroups);
            }

        }

        loadProxyGroups()

    }, []);

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
                        </tr>
                        </thead>
                        <tbody>
                        {isLoading_ZabbixProxyGroups ? <p>Loading...</p> : null}
                        {errorMessage_ZabbixProxyGroups.error ? <p>{errorMessage_ZabbixProxyGroups.message}</p> : null}
                        {!isLoading_ZabbixProxyGroups && proxyGroups.sort((a, b) => a.name > b.name ? 1 : -1).map((proxyGroup) => (
                            <tr className="clickable-row" key={proxyGroup.name} onClick={() => {
                                navigate(`/zabbix/proxygroup/${proxyGroup.proxy_groupid}`)
                            }}>
                                <td>{proxyGroup.name}</td>
                                <td>{ZabbixProxyGroupStatusBadge(proxyGroup.state)}</td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}