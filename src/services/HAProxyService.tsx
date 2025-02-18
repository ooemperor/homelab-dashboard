/**
 * Service Class for defining how to interact with a haproxy stats endpoint
 *
 * @author ooemperor
 */
import {config} from "../Config";
import {List} from "@mui/material";


export class HAProxyService {
    baseUrl: string | undefined;

    /**
     * Constructor of HAProxy Service
     * @param baseUrl the base url for the haproxy server
     */
    constructor(baseUrl: string | undefined) {
        this.baseUrl = baseUrl;
    }

    async getStats(): Promise<any> {
        let statsResponse: any = {success: false, data: null, message: ''};

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

           
            statsResponse.data = this.parseCsvData(csvData);
            statsResponse.success = true;
        } catch (error: any) {
            statsResponse.message = error;
        }
        return statsResponse;

    }

    private parseCsvData(csvData: any): any {
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
