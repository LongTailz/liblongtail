export type Timestamp = number;
export type PublicKey = string;
export type SecretKey = string;
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


export enum SensorType {
    
}
export enum ReadingType {
    
}
export enum ReadingUnit { 
    
}

export type ScalarType = 
    Timestamp | 
    PublicKey | 
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
    publicKey: PublicKey;
    secretKey: SecretKey;
    displaySeed: DisplaySeed;
    serial: SerialNum;
    name: string;
    createdAt: Timestamp;
    getSerial?: () => string;
  };

  export interface NodexProducer extends DBObject  { 
    publicKey: PublicKey;
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
    publicKey: PublicKey;
    sensorIdx: SensorIndex;
    value: Type;
    readingType: ReadingType;
    readingUnit: ReadingUnit;
    exponent: Exponent;
  }
  export type Log = LogAny<string | Float | Double |Uint8 | Int8  |Uint16  | Int16  |Uint32 |Int32|Uint64 |Int64 >;


  
