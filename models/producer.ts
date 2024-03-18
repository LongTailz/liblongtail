import DBObject from "../dbObject";
import { getByAll, insert } from '../db' 
import type { Nodex, Producer,
    Float, Double, Uint8, Int8, Uint16, Int16, Uint32, Int32, Uint64, Int64, ReadingType, ReadingUnit, Exponent,
    PublicKey, SecretKey, DisplaySeed, SerialNum, Timestamp, UID, SensorIndex, Log } from '../types'
export default class Producer_Model extends DBObject implements Producer { 
    static tableName: string = 'producers';
    uid: UID;
    displaySeed: DisplaySeed;
    lastContactAt: Timestamp;
    name: string;
    constructor(data: Producer, doInsert: boolean=true) { 
        super();
        this.uid = data.uid;
        this.displaySeed = data.displaySeed;
        this.lastContactAt = data.lastContactAt;
        this.name = data.name;
        if (doInsert) insert(Producer_Model.tableName,data);
    }
    get :any = (producerUid:any,idx:any) => { 
        return getByAll(Producer_Model.tableName, {producerUid, idx} )
    } ;
    create:any = (data:any) => { 
        const result = insert(Producer_Model.tableName,data);
        console.log(result);
    }
}
