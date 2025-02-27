/**
 * Rendering of the HAProxy Frontends view
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

/**
 * The default view for the HaProxyFrontends Overview
 * @constructor
 */
export default function HAProxyFrontends() {

    const {getHaProxyStats, isLoading_HAProxyStats, errorMessage_HAProxyStats} = useHAProxyStats();
    const {
        getHaProxyFrontendStats,
        isLoading_HAProxyFrontendStats,
        errorMessage_HAProxyFrontendStats
    } = useHAProxyFrontendStats();

    const navigate = useNavigate();

    const [stats, setStats] = useState<HaProxyStatItem[] | null>(null);
    const [frontendStats, setfrontendStats] = useState<HaProxyStatItem[] | null>(null);


    useEffect(() => {
        const loadStats = async () => {
            const statsData = await getHaProxyStats();
            setStats(statsData.response)
        }

        const loadFrontendStats = async () => {
            const frontendStatsData = await getHaProxyFrontendStats();
            setfrontendStats(frontendStatsData.response)
        }


        loadStats();
        loadFrontendStats();
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
                            <th>Frontend</th>
                            <th>Status</th>
                        </tr>
                        </thead>
                        <tbody>
                        {isLoading_HAProxyFrontendStats ? <p>Loading...</p> : null}
                        {errorMessage_HAProxyFrontendStats.error ?
                            <p>{errorMessage_HAProxyFrontendStats.message}</p> : null}
                        {!isLoading_HAProxyFrontendStats && frontendStats && frontendStats.map((frontend) => (
                            <tr className="clickable-row" key={frontend.pxname} onClick={() => {
                                navigate(`/haproxy/frontend/${frontend.pxname}`)
                            }}>
                                <td>{frontend.pxname}</td>
                                <td>{HAProxyStatusBadge(frontend.status)}</td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}