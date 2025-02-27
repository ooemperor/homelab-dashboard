/**
 * Rendering of the HAProxy Home view
 * @author ooemperor
 */
import React, {useEffect, useState} from "react";
import Accordion from "../../components/Accordion";
import {
    useHAProxyBackendStats,
    useHAProxyFrontendStats,
    useHAProxyServerStats,
    useHAProxyStats
} from "../../hooks/HAProxy/HAProxyStats";
import {useNavigate} from "react-router-dom";
import {HaProxyStatItem} from "../../models/haproxy/HAProxyStatsResponse";
import HAProxyStatusBadge from "../../components/HAProxy/HAProxyStatusBadge";
import {StatsCard} from "../../components/StatsCard";


export default function HAProxyHome() {

    const {getHaProxyStats, isLoading_HAProxyStats, errorMessage_HAProxyStats} = useHAProxyStats();
    const {getHaProxyFrontendStats, isLoading_HAProxyFrontendStats, errorMessage_HAProxyFrontendStats} = useHAProxyFrontendStats();
    const {getHaProxyBackendStats, isLoading_HAProxyBackendStats, errorMessage_HAProxyBackendStats} = useHAProxyBackendStats();
    const {getHaProxyServerStats, isLoading_HAProxyServerStats, errorMessage_HAProxyServerStats} = useHAProxyServerStats();


    const navigate = useNavigate();

    const [stats, setStats] = useState<HaProxyStatItem[] | null>(null);
    const [frontendStats, setfrontendStats] = useState<HaProxyStatItem[] | null>(null);
    const [backendStats, setbackendStats] = useState<HaProxyStatItem[] | null>(null);
    const [serverStats, setServerStats] = useState<HaProxyStatItem[] | null>(null);


    useEffect(() => {
        const loadStats = async() => {
            const statsData = await getHaProxyStats();
            setStats(statsData.response)
        }

        const loadBackendStats = async() => {
            const backendStatsData = await getHaProxyBackendStats();
            setbackendStats(backendStatsData.response)
        }

        const loadFrontendStats = async() => {
            const frontendStatsData = await getHaProxyFrontendStats();
            setfrontendStats(frontendStatsData.response)
        }

        const loadServerStats = async() => {
            const serverStatsData = await getHaProxyServerStats();
            setServerStats(serverStatsData.response)
        }

        loadStats();
        loadBackendStats();
        loadFrontendStats();
        loadServerStats();
    }, [])


    return (
        <div className="container">
            <div className={"row"}>
                <div className="col">
                    <h1>HA Proxy</h1>
                </div>
            </div>

            <div className={"row"}>
                <div className="col">
                    {!isLoading_HAProxyFrontendStats && frontendStats && StatsCard("Frontends", frontendStats.length)}
                </div>
                <div className="col">
                    {!isLoading_HAProxyBackendStats && backendStats && StatsCard("Backends", backendStats.length)}
                </div>
                <div className="col">
                    {!isLoading_HAProxyServerStats && serverStats && StatsCard("Server", serverStats.length)}
                </div>
            </div>

            <div className="row py-2">
                <div className="col">
                    {Accordion("backendAccordion", "Backends", <table className="table table-hover">
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
                    </table>)}
                </div>
            </div>

            <div className="row py-2">
                <div className="col">
                    {Accordion("frontendAccordion", "Frontends", <table className="table table-hover">
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
                    </table>)}
                </div>
            </div>

            <div className="row py-2">
                <div className="col">
                    {Accordion("serverAccordion", "Servers", <table className="table table-hover">
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
                    </table>)}
                </div>
            </div>
        </div>
    )
}