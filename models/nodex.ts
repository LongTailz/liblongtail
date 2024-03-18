import DBObject from "../dbObject";
const tableName='nodex';
import type { Nodex, PublicKey, SecretKey, DisplaySeed, SerialNum, Timestamp, UID, SensorIndex } from '../types'
import { getByAll, insert } from '../db' 
export default class Nodex_Model extends DBObject implements Nodex { 
    publicKey: PublicKey;
    secretKey: SecretKey;
    displaySeed: DisplaySeed;
    serial: SerialNum;
    name: string;
    createdAt: Timestamp;
    public static get :any = (publicKey: PublicKey) => { 
        console.log('dsffgsdfsdfsfsd');
        return getByAll(tableName, {publicKey} )
    
    } ;
    constructor(data: Nodex) {
        super();
        this.publicKey=data.publicKey;
        this.secretKey=data.secretKey;
        this.displaySeed=data.displaySeed;
        this.serial=data.serial;
        this.name=data.name;
        this.createdAt=data.createdAt;
        if (!this.createdAt) this.createdAt=Date.now();
        insert(tableName, data);
        
    }
    create:any = (data:any) => { 
        const result = insert(tableName,data);
        console.log(result);
    }
}