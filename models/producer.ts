import DBObject from "../dbObject";
const tableName='producers';
import { getByAll, insert } from '../db' 
import type { Nodex, Producer,
    Float, Double, Uint8, Int8, Uint16, Int16, Uint32, Int32, Uint64, Int64, ReadingType, ReadingUnit, Exponent,
    PublicKey, SecretKey, DisplaySeed, SerialNum, Timestamp, UID, SensorIndex, Log } from '../types'
export default class Producer_Model extends DBObject implements Producer { 
    uid: UID;
    displaySeed: DisplaySeed;
    lastContactAt: Timestamp;
    name: string;
    constructor(data: Producer) { 
        super();
        this.uid = data.uid;
        this.displaySeed = data.displaySeed;
        this.lastContactAt = data.lastContactAt;
        this.name = data.name;
        insert(tableName,data);
    }
    get :any = (producerUid:any,idx:any) => { 
        return getByAll(tableName, {producerUid, idx} )
    } ;
    create:any = (data:any) => { 
        const result = insert(tableName,data);
        console.log(result);
    }
}
