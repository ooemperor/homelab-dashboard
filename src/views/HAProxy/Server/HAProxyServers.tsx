/**
 * Rendering of the HAProxy Home view
 * @author ooemperor
 */
import React, {useEffect, useState} from "react";
import Accordion from "../../../components/Accordion";
import {
    useHAProxyBackendStats,
    useHAProxyFrontendStats,
    useHAProxyServerStats,
    useHAProxyStats
} from "../../../hooks/HAProxy/HAProxyStats";
import {useNavigate} from "react-router-dom";
import {HaProxyStatItem} from "../../../models/haproxy/HAProxyStatsResponse";
import HAProxyStatusBadge from "../../../components/HAProxy/HAProxyStatusBadge";
import {StatsCard} from "../../../components/StatsCard";


export default function HAProxyServers() {

    const {getHaProxyStats, isLoading_HAProxyStats, errorMessage_HAProxyStats} = useHAProxyStats();
    const {getHaProxyServerStats, isLoading_HAProxyServerStats, errorMessage_HAProxyServerStats} = useHAProxyServerStats();


    const navigate = useNavigate();

    const [stats, setStats] = useState<HaProxyStatItem[] | null>(null);
    const [serverStats, setServerStats] = useState<HaProxyStatItem[] | null>(null);


    useEffect(() => {
        const loadStats = async() => {
            const statsData = await getHaProxyStats();
            setStats(statsData.response)
        }

        const loadServerStats = async() => {
            const serverStatsData = await getHaProxyServerStats();
            setServerStats(serverStatsData.response)
        }

        loadStats();
        loadServerStats();
    }, [])


    return (
        <div className="container">
            <div className={"row"}>
                <div className="col">
                    <h1>HA Proxy</h1>
                </div>
            </div>

            <div className="row py-2">
                <div className="col">
                    <table className="table table-hover">
                        <thead>
                        <tr>
                            <th>Server</th>
                            <th>Backend</th>
                            <th>Status</th>
                        </tr>
                        </thead>
                        <tbody>
                        {isLoading_HAProxyServerStats ? <p>Loading...</p> : null}
                        {errorMessage_HAProxyServerStats.error ?
                            <p>{errorMessage_HAProxyServerStats.message}</p> : null}
                        {!isLoading_HAProxyServerStats && serverStats && serverStats.map((server) => (
                            <tr className="clickable-row" key={server.pxname} onClick={() => {
                                navigate(`/haproxy/server/${server.pxname}`)
                            }}>
                                <td>{server.svname}</td>
                                <td>{server.pxname}</td>
                                <td>{HAProxyStatusBadge(server.status)}</td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}