import DBObject from "../dbObject.js";
import { getByAll, insert } from '../db.js' 
import type { Nodex, Producer,
    Float, Double, Uint8, Int8, Uint16, Int16, Uint32, Int32, Uint64, Int64, ReadingType, ReadingUnit, Exponent,
    PublicKeyHash, SecretKey, DisplaySeed, SerialNum, Timestamp, UID, SensorIndex, Log } from '../types.js'
export default class Producer_Model extends DBObject<Producer> implements Producer { 
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

    static get = (uid:any, publicKey:any=null):Producer_Model => { 
        if (publicKey) { 
            return Producer_Model.getByAll<Producer_Model>({uid, publicKey} )[0]
        } else { 
            return Producer_Model.getByAll<Producer_Model>({uid} )[0]
        }
    } ;
    create:any = (data:any) => { 
        const result = insert(Producer_Model.tableName,data);
        console.log(result);
    }
}
