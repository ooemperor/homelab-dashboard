/**
 * Service Class for defining how to interact with a haproxy stats endpoint
 *
 * @author ooemperor
 */
import {config} from "../Config";
import {List} from "@mui/material";
import {HaProxyStatItem, HaProxyStatsResponse, HAProxyStatsStatus} from "../models/haproxy/HAProxyStatsResponse";


export class HAProxyService {
    baseUrl: string | undefined;

    /**
     * Constructor of HAProxy Service
     * @param baseUrl the base url for the haproxy server
     */
    constructor(baseUrl: string | undefined) {
        this.baseUrl = baseUrl;
    }

    async getStats(): Promise<HaProxyStatsResponse> {
        let statsResponse: HaProxyStatsResponse = {success: false, response: null, message: ''};

        try {
            const response: Response = await fetch(`${this.baseUrl}/stats;csv`, {
                method: 'GET',
                headers: {'Content-Type': 'text/plain'},
            });

            if (!response.ok) {
                statsResponse.message = response.statusText;
                return statsResponse;
            }
            const csvData = await response.text();

           
            statsResponse.response = this.parseCsvData(csvData);
            statsResponse.success = true;
        } catch (error: any) {
            statsResponse.message = error;
        }
        return statsResponse;
    }

    /**
     * Fetch all the metrics only for the backend servers.
     */
    async getServerStats(): Promise<HaProxyStatsResponse> {
        let response: HaProxyStatsResponse =  await this.getStats();

        if (response.success && response.response !== null) {
            // @ts-ignore
            response.response = response.response.filter((stat) => stat.svname !== 'BACKEND' && stat.svname !== 'FRONTEND')
            return response;
        }
        else {
            return response;
        }
    }

    /**
     * Private method to filter the svname for later use in specific fetch methods.
     * @param filter the string to filter for in the svname
     * @private
     */
    private async filterRequest(filter: string): Promise<HaProxyStatsResponse> {
        let response: HaProxyStatsResponse =  await this.getStats();

        if (response.success && response.response !== null) {
            // @ts-ignore
            response.response = response.response.filter((stat) => stat.svname === filter)
            return response;
        }
        else {
            return response;
        }
    }

    /**
     * Fetch the Stats only for the backends
     */
    async getBackendStats(): Promise<HaProxyStatsResponse> {
        return await this.filterRequest("BACKEND");
    }

    /**
     * Fetch the Stats only for the frontends
     */
    async getFrontendStats(): Promise<HaProxyStatsResponse> {
        return await this.filterRequest("FRONTEND");
    }


    private parseCsvData(csvData: any):  any {
        let outputDict: Array<{string: string}> = new Array<any>();
        let rows: string[] = csvData.split('\n');
        let keys: string[] = rows[0].substring(2).split(',')

        for (let i: number = 1; i < rows.length; i++) {
            let tmp_dict = Object.create(null);

            const values = rows[i].split(',');

            for (let j: number = 0; j < values.length; j++) {
                tmp_dict[keys[j]] = values[j];
            }
            outputDict.push(tmp_dict);

        }
        return outputDict;
    }
}

export const haProxyService = new HAProxyService(config.haproxyApi);
