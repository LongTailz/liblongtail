import DBObject from "../dbObject";
import { getByAll, insert } from '../db' 
import type { Nodex, 
    Float, Double, Uint8, Int8, Uint16, Int16, Uint32, Int32, Uint64, Int64, ReadingType, ReadingUnit, Exponent,
    PublicKey, SecretKey, DisplaySeed, SerialNum, Timestamp, UID, SensorIndex, Log } from '../types'
export default class Log_Model extends DBObject implements Log { 
    static tableName: string = 'log';
    createdAt: Timestamp;
    producerUid: UID;
    publicKey: PublicKey;
    sensorIdx: SensorIndex;
    value: string | Float | Double |Uint8 | Int8  |Uint16  | Int16  |Uint32 |Int32|Uint64 |Int64 ;
    readingType: ReadingType;
    readingUnit: ReadingUnit;
    exponent: Exponent;
    constructor(data: Log, doInsert: boolean=true) {
        super();
        this.createdAt = data.createdAt;
        this.producerUid = data.producerUid;
        this.publicKey = data.publicKey;
        this.sensorIdx = data.sensorIdx;
        this.value = data.value;
        this.readingType = data.readingType;
        this.readingUnit = data.readingUnit;
        this.exponent = data.exponent;
        if (doInsert) insert(Log_Model.tableName, data);
    }
    get :any = (producerUid: any,idx: any) => { 
        return getByAll(Log_Model.tableName, {producerUid, idx} )
    } ;
    create:any = (data: any) => { 
        const result = insert(Log_Model.tableName,data);
        console.log(result);
    }
}
