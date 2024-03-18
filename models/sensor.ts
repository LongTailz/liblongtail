import DBObject from "../dbObject";
const tableName='sensors';
import { getByAll, insert } from '../db' 
import type { Nodex, SensorType, Sensor,
    Float, Double, Uint8, Int8, Uint16, Int16, Uint32, Int32, Uint64, Int64, ReadingType, ReadingUnit, Exponent,
    PublicKey, SecretKey, DisplaySeed, SerialNum, Timestamp, UID, SensorIndex, Log } from '../types'
export default class Sensor_Model extends DBObject implements Sensor { 
    static tableName: string = 'sensors';
    producerUid: UID;
    idx: SensorIndex;
    type: SensorType;
    serial: SerialNum;
    name: string;
    constructor(data: Sensor, doInsert: boolean=true) { 
        super();
        this.producerUid=data.producerUid;
        this.idx=data.idx;
        this.type=data.type;
        this.serial=data.serial;
        this.name = data.name;
        if (doInsert) insert(Sensor_Model.tableName,data);
    }
    get :any = (producerUid:any,idx:any) => { 
        return getByAll(tableName, {producerUid, idx} )
    } ;
    create:any = (data:any) => { 
        const result = insert(tableName,data);
        console.log(result);
    }


}
