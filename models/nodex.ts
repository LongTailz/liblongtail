import DBObject from "../dbObject";
const tableName='nodex';
import type { ObjectType, Nodex, PublicKey, SecretKey, DisplaySeed, SerialNum, Timestamp, UID, SensorIndex } from '../types'
import { getByAll, insert } from '../db' 
export default class Nodex_Model extends DBObject implements Nodex { 
    static tableName: string = 'nodex';
    publicKey: PublicKey;
    secretKey: SecretKey;
    displaySeed: DisplaySeed;
    serial: SerialNum;
    name: string;
    createdAt: Timestamp;
    public static get :any = (publicKey: PublicKey):Nodex_Model => { 
        console.log('dsffgsdfsdfsfsd');
        return getByAll(tableName, {publicKey} ) as Nodex_Model
    } ;
    public static init :any = () => { 
        const mine: ObjectType[] = Nodex_Model.getMine();

        if (!mine.length) { 
            console.log('Got Init with no private key');
            new Nodex_Model({publicKey:'public',secretKey:'secret',displaySeed:2, serial:'dfs', name:'foo', createdAt: 100});

        } else { 
            console.log('We have found existing private keys');
            console.log(typeof tableName)
            console.log(typeof mine[0].getSerial)
            console.log(mine[0].getSerial())
        }
    }
    constructor(data: Nodex, doInsert: boolean=true) {
        console.log('Constructing Nodex');
        super();
        this.publicKey=data.publicKey;
        this.secretKey=data.secretKey;
        this.displaySeed=data.displaySeed;
        this.serial=data.serial;
        this.name=data.name;
        this.createdAt=data.createdAt;
        if (!this.createdAt) this.createdAt=Date.now();
        if (doInsert) insert(Nodex_Model.tableName,data);
        
    }
    public getSerial() { 
        console.log('GETSERIALCALLED');
        return this.serial;
    }
    create:any = (data:any) => { 
        const result = insert(tableName,data);
        console.log(result);
    }
}