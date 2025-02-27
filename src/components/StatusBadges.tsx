/**
 * Class used for standard StatusBadge definition in a single location
 * @author ooemperor
 */
import React from "react";

export function StatusBadgeSuccess(status: string): React.ReactElement {
    return <span className="badge text-bg-success">{status}</span>
}

export function StatusBadgeError(status: string): React.ReactElement {
    return <span className="badge text-bg-danger">{status}</span>
}

export function StatusBadgeInformation(status: string): React.ReactElement {
    return <span className="badge text-bg-blue">{status}</span>
}

export function StatusBadgeWarning(status: string): React.ReactElement {
    return <span className="badge text-bg-warning">{status}</span>
}