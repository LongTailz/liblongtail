import DBObject from "../dbObject.js";
const tableName='nodex';
import { type ObjectType, type Nodex, PublicKeyHash, type SecretKey, type DisplaySeed, type SerialNum, type Timestamp, type UID, type SensorIndex, HashType } from '../types.js'
import { getByAll, insert } from '../db.js' 
import {generateMnemonic, mnemonicToSeedSync,mnemonicToEntropy, entropyToMnemonic, } from 'bip39';
import { C, C as LucidC } from "lucid-cardano";
import { getBlake2bHash } from "../hash.js";
import muuid from 'machine-uuid';
const uuid:string = await muuid();

export default class Nodex_Model extends DBObject<Nodex> implements Nodex { 
    static tableName: string = 'nodex';
    static thisNodex:Nodex_Model|null = null;
    publicKey: PublicKeyHash;
    secretKey: SecretKey;
    displaySeed: DisplaySeed;
    serial: SerialNum;
    name: string;
    createdAt: Timestamp;
    public static get :any = (publicKey: PublicKeyHash):Nodex_Model => { 
        console.log('dsffgsdfsdfsfsd');
        return getByAll(tableName, {publicKey} )[0] as Nodex_Model
    } ;
    public static init = async ():Promise<Nodex_Model> => { 
        const mine: Nodex_Model[] = Nodex_Model.getMine();
        if (!mine.length) { 
            console.log('Got Init with no private key');
            const mnemonic = generateMnemonic(256);
	    const entropy = mnemonicToEntropy(mnemonic);
            const secretKey = entropy;
	    const rootKey = LucidC.Bip32PrivateKey.from_bip39_entropy(Buffer.from(entropy,'hex'),Buffer.from(''));
        
        console.log('mnemonic: '+mnemonic);
        console.log(rootKey);
	    
        const harden = (num: number): number  => {
            if (typeof num !== "number") throw new Error("Type number required here!");
            return 0x80000000 + num;
          }
        
          const accountKey = rootKey.derive(
            harden(69)) // Purpose 
            .derive(harden(1815)) // Coin type
            .derive(harden(0)); // Account #
            
           
          const childKey = accountKey.
          derive(0) // Change (0 for external address, 1 for internal change address)
          .derive(0); // Index

          const publicKey = new PublicKeyHash(childKey.to_public().to_raw_key());
        
          
          console.log("This is what we got: "+JSON.stringify(childKey.to_bech32()));

        console.log(publicKey.toString())
            this.thisNodex= new Nodex_Model({publicKey,secretKey, serial:uuid, name:'foo', createdAt: 100, displaySeed: 0});

        } else { 
            console.log('We have found existing private keys');
            console.log(typeof tableName)
            console.log(mine[0].getBaseAddress())
            this.thisNodex=mine[0];
            
            console.log(entropyToMnemonic(mine[0].secretKey))
            console.log(mine[0])
        }
        return this.thisNodex;
    }
    constructor(data: Nodex, doInsert: boolean=true) {
        console.log('Constructing Nodex');
        super();
        if (data.publicKey instanceof PublicKeyHash) { 
            this.publicKey = data.publicKey;
        } else { 
            this.publicKey=new PublicKeyHash(data.publicKey);
        }
        this.secretKey=data.secretKey;
        this.displaySeed=data.displaySeed;
        this.serial=data.serial;
        this.name=data.name;
        this.createdAt=data.createdAt;
        if (!this.createdAt) this.createdAt=Date.now();
        if (doInsert) insert(Nodex_Model.tableName,data);
        
    }
    public getBaseAddress():string {
        const addr = C.EnterpriseAddress.new(0,C.StakeCredential.from_keyhash(C.Ed25519KeyHash.from_hex(Buffer.from(this.publicKey.buf).toString('hex'))));
        const bech32 = addr.to_address().to_bech32('addr');
        const addr2 = C.Address.from_bech32(bech32);
        console.log(addr2.as_base());
        return addr.to_address().to_bech32('foo');

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
