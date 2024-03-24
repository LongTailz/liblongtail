import {SObject, SUInt32LE, field} from 'serio';
import { getBlake2bHash } from './hash.js';
import { C, Lucid, C as LucidC } from "lucid-cardano";
export type Timestamp = number;
export type DisplaySeed = number;
export type SensorIndex = number;
export type UID = string;
export type SerialNum = string;
export type Exponent = number;
export type Uint8 = number;
export type Int8 = number;
export type Uint16 = number;
export type Int16 = number;
export type Uint32 = number;
export type Int32 = number;
export type Uint64 = number;
export type Int64 = number;
export type Float = number;
export type Double = number; 
export enum HashType { 
  BLAKE2b=0,
  BLAKE2s=1,
  SHA2=2,
  SHA3=3
}

export type HashSize = Uint8;
type Shift<A extends Array<any>> = 
  ((...args: A) => void) extends ((...args: [A[0], ...infer R]) => void) ? R : never;

type GrowExpRev<A extends any[], N extends number, P extends any[][]> = 
  A['length'] extends N ? A : [...A, ...P[0]][N] extends undefined ? GrowExpRev<[...A, ...P[0]], N, P> : GrowExpRev<A, N, Shift<P>>;

type GrowExp<A extends any[], N extends number, P extends any[][], L extends number = A['length']> = 
  L extends N ? A : L extends 8192 ? any[] : [...A, ...A][N] extends undefined ? GrowExp<[...A, ...A], N, [A, ...P]> : GrowExpRev<A, N, P>;

type MapItemType<T, I> = { [K in keyof T]: I };

export type FixedSizeArray<T, N extends number> = 
  N extends 0 ? [] : MapItemType<GrowExp<[0], N, []>, T>;

let tuple8192: FixedSizeArray<boolean, 8192>;
// let tuple8192: [boolean, boolean, boolean, boolean, boolean, boolean, boolean, 
// boolean, boolean, boolean, boolean, boolean, boolean, boolean, boolean, boolean, 
// boolean, boolean, ... 8173 more ..., boolean]

let tuple8193: FixedSizeArray<boolean, 8193>; 
// let tuple8193: boolean[]

type HashBuffer<
  N extends HashSize
> = FixedSizeArray<Uint8,N>;

export interface Hash224 { 
  type: HashType,
  buf: HashBuffer<28>,
  toString(): string;
  toJSON(): object;
}


export class PublicKeyHash implements Hash224 {
  public type=HashType.BLAKE2b;
  public buf:HashBuffer<28>;

  
  constructor(public key: LucidC.PublicKey | string) {
    let hash;
    if (key instanceof LucidC.PublicKey) { 
      const kbytes = key.as_bytes();
      hash = getBlake2bHash(28,Buffer.from(kbytes))
    } else if (typeof key == "string") { 
      hash = Buffer.from(key, "hex")
    } else { 
      throw new Error('Invalid type key passed to PublicKeyHash constructor: '+key)
    }
    
    
    if (hash.byteLength != 28) throw new Error('Constructed PublicKey with hash which is not 28 bytes ('+hash.byteLength+')')
    let ar:HashBuffer<28> = new Array(28).fill(0 as Uint8) as HashBuffer<28>;
    for (let c=0; c<28; c++) { 
      ar[c]=hash[c];
    }
    this.buf=ar;
   }
  public toString = () : string => { 
    const bufStr = Buffer.from(this.buf);
    
    return bufStr.toString('hex');
  }
  public toJSON = () : object => { 
    return {hash: this.toString(), type: this.type}
  }
}
export type SecretKey = string;
export type RootKey = string; 
export type NumberValues<T> = {
  [K in keyof T]: T[K] extends number ? T[K] : never;
}[keyof T];
/*
export const SensorTypes = {
  DHT11: 1,
  DHT22: 2
} as const;
*/
export enum SensorTypes {
  LM75=0,
  DHT11= 1,
  DHT22 =2,
  SCD40=3,
  SCD41=4
}

export type SensorType = NumberValues<typeof SensorTypes>;

export enum ReadingTypes {
    TEMP=0,
    HUMID=1,
    CO2=2,
    PRES=3,
    REF_ALT=4,
    REF_OFFSET=5,
    SENSOR=6,
    SERIALNO=7
}
export type ReadingType = NumberValues<typeof ReadingTypes>;

export enum ReadingUnits { 
  CELSIUS=0,
  FAHRENHEIT=1,
  PERCENT=2,
  PPM=3,
  METERS=4,
  FEET=5,
  SENSOR=6,
  SERIALNO=7,
  HZ=8,
  DB=9
}
export type ReadingUnit = NumberValues<typeof ReadingUnits>;

export type ScalarType = 
    Timestamp | 
    PublicKeyHash | 
    SecretKey | 
    DisplaySeed | 
    SensorIndex | 
    UID | 
    SerialNum | 
    Exponent | 
    Float | 
    Double |
    Uint8 | Int8  |Uint16  | Int16  |Uint32 |Int32|Uint64 |Int64 
export type ObjectType = Producer | Nodex | Sensor | Log | DBObject;
export interface DBObject {
  
    [key: string]: any;
    //get: (...args: any)=>DBObject;
    
}
export interface Producer extends DBObject {
    uid: UID;
    displaySeed: DisplaySeed;
    lastContactAt: Timestamp;
    name: string;
  };
  export interface Nodex extends DBObject {
    publicKey: PublicKeyHash | string;
    secretKey: RootKey;
    displaySeed: DisplaySeed;
    serial: SerialNum;
    name: string;
    createdAt: Timestamp;
    getSerial?: () => string;
  };

  export interface NodexProducer extends DBObject  { 
    publicKey: PublicKeyHash;
    uid: UID;
  }
  
  export interface Sensor extends DBObject  { 
    producerUid: UID;
    idx: SensorIndex;
    type: SensorType;
    serial: SerialNum;
    name: string;
  }

  export interface LogAny<Type> extends DBObject  { 
    createdAt: Timestamp;
    producerUid: UID;
    publicKey: PublicKeyHash | string;
    sensorIdx: SensorIndex;
    value: Type;
    readingType: ReadingType;
    readingUnit: ReadingUnit;
    exponent: Exponent;
  }
  export type CTypes = "float" | "double" | "uint8" | "int8" | "uint16" | "int16" | "uint32" | "int32" | "uint64" | "int64" | "string";
  export type LogTypes = string | Float | Double |Uint8 | Int8  |Uint16  | Int16  |Uint32 |Int32|Uint64 |Int64 
  export type Log = LogAny<LogTypes>;


  
