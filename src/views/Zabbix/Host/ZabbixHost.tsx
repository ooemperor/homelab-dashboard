/**
 * Rendering of the Zabbix Hosts view for a single Hosts
 * @author ooemperor
 */

import React, {useEffect, useState} from "react";
import {useNavigate, useParams} from "react-router-dom";
import {ZabbixHost} from "../../../models/zabbix/ZabbixHost";
import {useZabbixHost} from "../../../hooks/Zabbix/useZabbixHosts";
import {useZabbixItems} from "../../../hooks/Zabbix/useZabbixItem";
import {ZabbixItem} from "../../../models/zabbix/ZabbixItem";
import {ZabbixItemStatsRow} from "../../../components/Zabbix/ZabbixHost";

export default function ZabbixHost_View() {
    const {id} = useParams();
    let id_: string = "";
    if (id) {
        id_ = id.toString();
    }

    const {getZabbixHost, errorMessage_ZabbixHost, isLoading_ZabbixHost} = useZabbixHost();
    const {getZabbixItems, errorMessage_ZabbixItems, isLoading_ZabbixItems} = useZabbixItems();

    const [host, setHosts] = useState<ZabbixHost>();
    const [items, setItems] = useState<ZabbixItem[]>();

    const navigate = useNavigate();
    useEffect(() => {
        //loading hosts
        const loadHost = async () => {
            const hostData = await getZabbixHost(id_);
            if (hostData.host === null) {
                setHosts(undefined);
            } else {
                setHosts(hostData.host);
            }
        }

        const loadItems = async () => {
            const filters = {hostids: [id_]}
            const itemsData = await getZabbixItems(filters);
            if (itemsData.items === null) {
                setItems(undefined);
            } else {
                setItems(itemsData.items);
            }
        }

        loadHost()
        loadItems()

    }, []);

    return (
        <div className="container">
            <div className={"row"}>
                <div className="col">
                    <h1>Host {isLoading_ZabbixHost ? "" : host && host.host}</h1>
                </div>
            </div>
            <div className="row">
                <div className="col">
                    <p>Host {isLoading_ZabbixHost ? "" : host && host.host}</p>
                </div>
            </div>
            {isLoading_ZabbixHost ? <p>Loading...</p> : null}
            {errorMessage_ZabbixHost.error ? <p>{errorMessage_ZabbixHost.message}</p> : null}
            {items && ZabbixItemStatsRow(items)}
            
        </div>
    )
}