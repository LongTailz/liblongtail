import DBObject from "../dbObject.js";
import { getByAll, insert } from '../db.js' 
import { Nodex, 
    Float, Double, Uint8, Int8, Uint16, Int16, Uint32, Int32, Uint64, Int64, ReadingType, ReadingUnit, Exponent,
    PublicKeyHash, SecretKey, DisplaySeed, SerialNum, Timestamp, UID, SensorIndex, Log, LogAny, LogTypes, CTypes, SensorTypes } from '../types.js'
import Producer_Model from "./producer.js";
import Sensor_Model from "./sensor.js";
export default class Log_Model<T extends LogTypes> extends DBObject<LogAny<T>> implements Log { 
    static tableName: string = 'log';
    createdAt: Timestamp;
    producerUid: UID;
    publicKey: PublicKeyHash | string;
    sensorIdx: SensorIndex;
    value: T;
    readingType: ReadingType;
    readingUnit: ReadingUnit;
    exponent: Exponent;
    tableNameSuffix: string;
    constructor(data: LogAny<T>, tableNameSuffix: string, doInsert: boolean=true) {
        super();
        this.tableNameSuffix = tableNameSuffix;
        this.createdAt = data.createdAt;
        this.producerUid = data.producerUid;
        this.publicKey = data.publicKey;
        this.sensorIdx = data.sensorIdx;
        this.value = data.value;
        this.readingType = data.readingType;
        this.readingUnit = data.readingUnit;
        this.exponent = data.exponent;
        

        if (doInsert) insert(Log_Model.tableName+'_'+this.tableNameSuffix, data);
    }
    static log = async (uid: UID, type: ReadingType, unit: ReadingUnit, idx: SensorIndex, exp: Exponent, val: any, ctype: CTypes) => {
        var n;
        
        let producer = Producer_Model.get(uid);
        if (!producer) { 
            producer = new Producer_Model({uid, displaySeed: 0, lastContactAt: 0, name:''})
        }
        let sensor = Sensor_Model.get(producer.uid,idx)
        if (!sensor) { 
            console.log('No sensor found, creating new sensor');
            sensor = new Sensor_Model({producerUid: producer.uid, idx, type: 1 , serial: "0", name:'' })
            
        } else { 
            console.log('Sensor found');
            console.log(sensor);
            console.log(typeof sensor.type)
        }
        console.log(producer);
        var build = {readingType: type, readingUnit: unit, value: val, sensorIdx: idx, exponent: exp, producerUid: uid,publicKey: '0', createdAt: Date.now()  };
        switch (ctype) { 
            case 'string':
                n=new Log_Model<string>(build,ctype);
                break;
            case 'float':
                n=new Log_Model<Float>(build, ctype);
                break;
            case 'double':
                n=new Log_Model<Double>(build, ctype);
                break;
            case 'uint8':
                n=new Log_Model<Uint8>(build, ctype);
                break;
            case 'int8':
                n=new Log_Model<Int8>(build, ctype);
                break;
        }

    }
    get :any = (producerUid: any,idx: any) => { 
        return getByAll(Log_Model.tableName, {producerUid, idx} )
    } ;
    create:any = (data: any) => { 
        const result = insert(Log_Model.tableName,data);
        console.log(result);
    }
}
