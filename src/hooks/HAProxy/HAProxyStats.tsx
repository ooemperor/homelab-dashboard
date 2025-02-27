/**
 * useHAProxyStats for Zabbix
 * Method used in loading the data in the Route
 */

import {useState} from "react";
import {ErrorMessage} from "../../models/ErrorMessage";
import {HaProxyStatsResponse} from "../../models/haproxy/HAProxyStatsResponse";
import {haProxyService} from "../../services/HAProxyService";

/**
 * Hook for fetching all the HAProxy Stats
 */
export const useHAProxyStats = () => {
    const [errorMessage_HAProxyStats, setErrorMessageProps] = useState<ErrorMessage>({error: false, message: ''});
    const [isLoading_HAProxyStats, setIsLoading] = useState<Boolean>(false);

    const getHaProxyStats = async () => {
        setIsLoading(true);
        setErrorMessageProps({error: false, message:''});

        const statsResponse: HaProxyStatsResponse = await haProxyService.getStats();
        if (!statsResponse.success) {
            setErrorMessageProps({error: true, message: statsResponse.message});
        }
        setIsLoading(false);
        return statsResponse;
    }

    return {getHaProxyStats, isLoading_HAProxyStats, errorMessage_HAProxyStats};
}

/**
 * Hook for fetching all the Frontend HAProxy Stats
 */
export const useHAProxyFrontendStats = () => {
    const [errorMessage_HAProxyFrontendStats, setErrorMessageProps] = useState<ErrorMessage>({error: false, message: ''});
    const [isLoading_HAProxyFrontendStats, setIsLoading] = useState<Boolean>(false);

    const getHaProxyFrontendStats = async () => {
        setIsLoading(true);
        setErrorMessageProps({error: false, message:''});

        const statsResponse: HaProxyStatsResponse = await haProxyService.getFrontendStats();
        if (!statsResponse.success) {
            setErrorMessageProps({error: true, message: statsResponse.message});
        }
        setIsLoading(false);
        return statsResponse;
    }

    return {getHaProxyFrontendStats, isLoading_HAProxyFrontendStats, errorMessage_HAProxyFrontendStats};
}

/**
 * Hook for fetching all the Backend HAProxy Stats
 */
export const useHAProxyBackendStats = () => {
    const [errorMessage_HAProxyBackendStats, setErrorMessageProps] = useState<ErrorMessage>({error: false, message: ''});
    const [isLoading_HAProxyBackendStats, setIsLoading] = useState<Boolean>(false);

    const getHaProxyBackendStats = async () => {
        setIsLoading(true);
        setErrorMessageProps({error: false, message:''});

        const statsResponse: HaProxyStatsResponse = await haProxyService.getBackendStats();
        if (!statsResponse.success) {
            setErrorMessageProps({error: true, message: statsResponse.message});
        }
        setIsLoading(false);
        return statsResponse;
    }

    return {getHaProxyBackendStats, isLoading_HAProxyBackendStats, errorMessage_HAProxyBackendStats};
}

/**
 * Hook for fetching all the Server HAProxy Stats
 */
export const useHAProxyServerStats = () => {
    const [errorMessage_HAProxyServerStats, setErrorMessageProps] = useState<ErrorMessage>({error: false, message: ''});
    const [isLoading_HAProxyServerStats, setIsLoading] = useState<Boolean>(false);

    const getHaProxyServerStats = async () => {
        setIsLoading(true);
        setErrorMessageProps({error: false, message:''});

        const statsResponse: HaProxyStatsResponse = await haProxyService.getServerStats();
        if (!statsResponse.success) {
            setErrorMessageProps({error: true, message: statsResponse.message});
        }
        setIsLoading(false);
        return statsResponse;
    }

    return {getHaProxyServerStats, isLoading_HAProxyServerStats, errorMessage_HAProxyServerStats};
}