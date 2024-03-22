import DBObject from "../dbObject.js";
const tableName='sensors';
import { getByAll, insert } from '../db.js' 
import type { Nodex, SensorType, Sensor,
    Float, Double, Uint8, Int8, Uint16, Int16, Uint32, Int32, Uint64, Int64, ReadingType, ReadingUnit, Exponent,
    PublicKeyHash, SecretKey, DisplaySeed, SerialNum, Timestamp, UID, SensorIndex, Log, NumberValues} from '../types.js'
export default class Sensor_Model extends DBObject<Sensor> implements Sensor { 
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
        if (typeof data.type == 'string') { 
            data.type=Number(data.type) as SensorType;
        }
        this.type=data.type;
        this.serial=data.serial;
        this.name = data.name;
        if (doInsert) insert(Sensor_Model.tableName,data);
    }
    static get = (producerUid:any, idx: any):Sensor_Model => { 
        return Sensor_Model.getByAll<Sensor_Model>({producerUid, idx} )[0]
    } ;
    create:any = (data:any) => { 
        const result = insert(tableName,data);
        console.log(result);
    }


}
