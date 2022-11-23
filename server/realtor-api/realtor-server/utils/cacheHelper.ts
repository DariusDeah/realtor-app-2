import AmazonDaxClient from 'amazon-dax-client';
import { DynamoDB } from 'aws-sdk';
class CacheHelper {
    private _endpoint: string;
    private _tableName: string;
    private _client;
    private _dax;

    constructor() {
        this._tableName = 'CacheStore';
        this._endpoint = 'daxs://cachestorecluster.rvhfa6.dax-clusters.us-west-2.amazonaws.com';
        this._dax = new AmazonDaxClient({ endpoints: [this._endpoint], region: 'us-west-2' });
        this._client = new DynamoDB.DocumentClient({ service: this._dax as unknown as DynamoDB });
    }

    async addToCache(item: Record<string, unknown> | Record<string, unknown>[]) {
        try {
            const one_epoch_day = 86400;
            const one_epoch_day_from_current_time = Math.floor(Date.now() / 1000) + one_epoch_day;

            const res = await this._client
                .put({
                    TableName: this._tableName,
                    Item: { ...item, expireAt: one_epoch_day_from_current_time },
                })
                .promise();
            console.log(res);
            return res;
        } catch (error) {
            console.log(error);
            return null;
        }
    }

    async fetchFromCache(id: string) {
        try {
            const cacheRes = await this._client
                .get({
                    TableName: this._tableName,
                    Key: {
                        id,
                    },
                })
                .promise();
            if (cacheRes.Item) {
                console.log({ cacheRes });
                return cacheRes.Item;
            } else {
                console.log('no cache', { cacheRes });
                return null;
            }
        } catch (error) {
            console.log(error);
            return null;
        }
    }
}

export const cacheHelper = new CacheHelper();
