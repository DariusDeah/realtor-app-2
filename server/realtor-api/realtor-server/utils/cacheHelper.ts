import AmazonDaxClient from 'amazon-dax-client';
import { DynamoDB } from 'aws-sdk';
class CacheHelper {
    private _endpoint: string;
    private _tableName: string;
    private _client;
    private _dax;

    constructor() {
        this._tableName = 'cacheStore';
        this._endpoint = 'daxs://cachestorecluster.rvhfa6.dax-clusters.us-west-2.amazonaws.com';
        this._dax = new AmazonDaxClient({ endpoints: [this._endpoint], region: 'us-west-2' });
        this._client = new DynamoDB.DocumentClient({ service: this._dax as unknown as DynamoDB });
    }

    async addToCache(item: Record<string, unknown>) {
        try {
            const res = await this._client
                .put({
                    TableName: this._tableName,
                    Item: { ...item, expireAt: 86400 },
                })
                .promise();
            return res.$response.data;
        } catch (error) {
            console.log(error);
            return;
        }
    }
    // async fetchFromCache() {
    //     const cacheRes = await this._client.get({
    //         TableName: this._tableName,
    //         Key,
    //     });
    // }
}

export const cacheHelper = new CacheHelper();
