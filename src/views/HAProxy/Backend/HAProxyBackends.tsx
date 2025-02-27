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

/**
 * The default view for the HAProxyBackends Overview
 * @constructor
 */
export default function HAProxyBackends() {

    const {getHaProxyStats, isLoading_HAProxyStats, errorMessage_HAProxyStats} = useHAProxyStats();
    const {
        getHaProxyBackendStats,
        isLoading_HAProxyBackendStats,
        errorMessage_HAProxyBackendStats
    } = useHAProxyBackendStats();

    const navigate = useNavigate();

    const [stats, setStats] = useState<HaProxyStatItem[] | null>(null);
    const [backendStats, setbackendStats] = useState<HaProxyStatItem[] | null>(null);

    useEffect(() => {
        const loadStats = async () => {
            const statsData = await getHaProxyStats();
            setStats(statsData.response)
        }

        const loadBackendStats = async () => {
            const backendStatsData = await getHaProxyBackendStats();
            setbackendStats(backendStatsData.response)
        }

        loadStats();
        loadBackendStats();
    }, [])


    return (
        <div className="container">
            <div className={"row"}>
                <div className="col">
                    <h1>HA Proxy</h1>
                </div>
            </div>
            <div className="row">
                <div className="col">
                    <table className="table table-hover">
                        <thead>
                        <tr>
                            <th>Backend</th>
                            <th>Status</th>
                        </tr>
                        </thead>
                        <tbody>
                        {isLoading_HAProxyBackendStats ? <p>Loading...</p> : null}
                        {errorMessage_HAProxyBackendStats.error ?
                            <p>{errorMessage_HAProxyBackendStats.message}</p> : null}
                        {!isLoading_HAProxyBackendStats && backendStats && backendStats.map((backend) => (
                            <tr className="clickable-row" key={backend.pxname} onClick={() => {
                                navigate(`/haproxy/backend/${backend.pxname}`)
                            }}>
                                <td>{backend.pxname}</td>
                                <td>{HAProxyStatusBadge(backend.status)}</td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}