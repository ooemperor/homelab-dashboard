/**
 * Rendering of the Zabbix Hosts view for a single Hosts
 * @author ooemperor
 */

import React, {useEffect, useState} from "react";
import {useNavigate, useParams} from "react-router-dom";
import {ZabbixProxyGroup} from "../../../models/zabbix/ZabbixProxyGroup";
import {useZabbixProxyGroup} from "../../../hooks/Zabbix/useZabbixProxyGroup";

export default function ZabbixProxyGroup_View() {
    const {id} = useParams();
    let id_: string = "";
    if (id) {
        id_ = id.toString();
    }

    const {getZabbixProxyGroup, errorMessage_ZabbixProxyGroup, isLoading_ZabbixProxyGroup} = useZabbixProxyGroup();

    const [proxyGroup, setProxyGroup] = useState<ZabbixProxyGroup>();

    const navigate = useNavigate();
    useEffect(() => {
        //loading hosts
        const loadProxyGroup = async () => {
            const proxyGroupData = await getZabbixProxyGroup(id_);
            if (proxyGroupData.proxyGroup === null) {
                setProxyGroup(undefined);
            } else {
                setProxyGroup(proxyGroupData.proxyGroup);
            }
        }
        loadProxyGroup()

    }, []);

    return (
        <div className="container">
        <div className={"row"}>
        <div className="col">
            <h1>Host {isLoading_ZabbixProxyGroup ? "" : proxyGroup && proxyGroup.name}</h1>
    </div>
    </div>
    <div className="row py-2">
    <div className="col">
        <p>ProxyGroup {isLoading_ZabbixProxyGroup ? "" : proxyGroup && proxyGroup.name}</p>
    </div>
    </div>
    {isLoading_ZabbixProxyGroup ? <p>Loading...</p> : null}
        {errorMessage_ZabbixProxyGroup.error ? <p>{errorMessage_ZabbixProxyGroup.message}</p> : null}
            </div>
        )
        }