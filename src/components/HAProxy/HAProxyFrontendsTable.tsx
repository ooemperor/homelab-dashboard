import HAProxyStatusBadge from "./HAProxyStatusBadge";
import React from "react";
import {HaProxyStatItem} from "../../models/haproxy/HAProxyStatsResponse";
import {useNavigate} from "react-router-dom";

/**
 * Table object for possible later use as rendering of a frontendTable
 * @param frontendStats
 * @constructor
 */
export default function HAProxyFrontendsTable(frontendStats: HaProxyStatItem[]) {
    const navigate = useNavigate();

    return (
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
                    {frontendStats && frontendStats.map((frontend) => (
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
    )
}