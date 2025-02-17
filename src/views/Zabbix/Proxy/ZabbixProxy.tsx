/**
 * Rendering of the Zabbix Hosts view for a single Hosts
 * @author ooemperor
 */

import React, {useEffect, useState} from "react";
import {useNavigate, useParams} from "react-router-dom";
import {ZabbixHostGraphRow, ZabbixItemStatsRow} from "../../../components/Zabbix/ZabbixHost";
import {useZabbixProxy} from "../../../hooks/Zabbix/useZabbixProxy";
import {ZabbixProxy} from "../../../models/zabbix/ZabbixProxy";

export default function ZabbixProxy_View() {
    const {id} = useParams();
    let id_: string = "";
    if (id) {
        id_ = id.toString();
    }

    const {getZabbixProxy, errorMessage_ZabbixProxy, isLoading_ZabbixProxy} = useZabbixProxy();

    const [proxy, setProxy] = useState<ZabbixProxy>();

    const navigate = useNavigate();
    useEffect(() => {
        //loading hosts
        const loadProxy = async () => {
            const proxyData = await getZabbixProxy(id_);
            if (proxyData.proxy === null) {
                setProxy(undefined);
            } else {
                setProxy(proxyData.proxy);
            }
        }
        loadProxy()

    }, []);

    return (
        <div className="container">
        <div className={"row"}>
        <div className="col">
            <h1>Host {isLoading_ZabbixProxy ? "" : proxy && proxy.name}</h1>
    </div>
    </div>
    <div className="row py-2">
    <div className="col">
        <p>Host {isLoading_ZabbixProxy ? "" : proxy && proxy.name}</p>
    </div>
    </div>
    {isLoading_ZabbixProxy ? <p>Loading...</p> : null}
        {errorMessage_ZabbixProxy.error ? <p>{errorMessage_ZabbixProxy.message}</p> : null}
            </div>
        )
        }