
import { IMigration } from '@blackglory/better-sqlite3-migrations'
const sqliteMigrations:IMigration[] = [
    {
        "version":1,
        "up":`CREATE TABLE producers (
            uid TEXT NOT NULL PRIMARY KEY,
            displaySeed INTEGER default 0,
            lastContactAt NUMBER default NULL,
            name TEXT NOT NULL default ''
         );`,
         "down":""
    },

    {
        "version":2,
        "up":`
        CREATE TABLE nodex ( 
            publicKey TEXT NOT NULL PRIMARY KEY,
            secretKey TEXT default NULL,
            displaySeed INTEGER default 0,
            serial TEXT default NULL,
            name TEXT NOT NULL,
            createdAt INTEGER NOT NULL
        );
        CREATE TABLE nodex_producers ( 
            publicKey TEXT NOT NULL,
            uid TEXT NOT NULL,
            primary key (publicKey, uid)
        );
         CREATE TABLE sensors (
            producerUid INTEGER NOT NULL,
            idx INTEGER NOT NULL,
            type TEXT NOT NULL,
            serial TEXT NOT NULL,
            name TEXT NOT NULL,
            PRIMARY KEY (producerUid, idx)
         );
         CREATE TABLE log_float (
            createdAt INTEGER NOT NULL,
            producerUid INTEGER NOT NULL,
            publicKey TEXT NOT NULL,
            sensorIdx INTEGER NOT NULL,
            value NUMBER NOT NULL,
            readingType INTEGER NOT NULL, 
            readingUnit INTEGER NOT NULL,
            exponent INTEGER NOT NULL,
            primary key (createdAt, producerUid, sensorIdx)

         );
         CREATE TABLE log_double ( 
            createdAt INTEGER NOT NULL,
            producerUid INTEGER NOT NULL,
            publicKey TEXT NOT NULL,
            sensorIdx INTEGER NOT NULL,
            value NUMBER NOT NULL,
            readingType INTEGER NOT NULL, 
            readingUnit INTEGER NOT NULL,
            exponent INTEGER NOT NULL,
            primary key (createdAt, producerUid, sensorIdx)
         );
         CREATE TABLE log_string (
            createdAt INTEGER NOT NULL,
            producerUid INTEGER NOT NULL,
            publicKey TEXT NOT NULL,
            sensorIdx INTEGER NOT NULL,
            value TEXT NOT NULL,
            readingType INTEGER NOT NULL, 
            readingUnit INTEGER NOT NULL,
            exponent INTEGER NOT NULL,
            primary key (createdAt, producerUid, sensorIdx)
         );
         CREATE TABLE log_uint8 ( 
            createdAt INTEGER NOT NULL,
            producerUid INTEGER NOT NULL,
            publicKey TEXT NOT NULL,
            sensorIdx INTEGER NOT NULL,
            value INTEGER NOT NULL,
            readingType INTEGER NOT NULL, 
            readingUnit INTEGER NOT NULL,
            exponent INTEGER NOT NULL,
            primary key (createdAt, producerUid, sensorIdx)
         );
         CREATE TABLE log_int8 ( 
            createdAt INTEGER NOT NULL,
            producerUid INTEGER NOT NULL,
            publicKey TEXT NOT NULL,
            sensorIdx INTEGER NOT NULL,
            value INTEGER NOT NULL,
            readingType INTEGER NOT NULL, 
            readingUnit INTEGER NOT NULL,
            exponent INTEGER NOT NULL,
            primary key (createdAt, producerUid, sensorIdx)
         );
         CREATE TABLE log_uint16 ( 
            createdAt INTEGER NOT NULL,
            producerUid INTEGER NOT NULL,
            publicKey TEXT NOT NULL,
            sensorIdx INTEGER NOT NULL,
            value INTEGER NOT NULL,
            readingType INTEGER NOT NULL, 
            readingUnit INTEGER NOT NULL,
            exponent INTEGER NOT NULL,
            primary key (createdAt, producerUid, sensorIdx)
         );
         CREATE TABLE log_int16 ( 
            createdAt INTEGER NOT NULL,
            producerUid INTEGER NOT NULL,
            publicKey TEXT NOT NULL,
            sensorIdx INTEGER NOT NULL,
            value INTEGER NOT NULL,
            readingType INTEGER NOT NULL, 
            readingUnit INTEGER NOT NULL,
            exponent INTEGER NOT NULL,
            primary key (createdAt, producerUid, sensorIdx)
         );
         CREATE TABLE log_uint32 ( 
            createdAt INTEGER NOT NULL,
            producerUid INTEGER NOT NULL,
            publicKey TEXT NOT NULL,
            sensorIdx INTEGER NOT NULL,
            value INTEGER NOT NULL,
            readingType INTEGER NOT NULL, 
            readingUnit INTEGER NOT NULL,
            exponent INTEGER NOT NULL,
            primary key (createdAt, producerUid, sensorIdx)
         );
         CREATE TABLE log_int32 ( 
            createdAt INTEGER NOT NULL,
            producerUid INTEGER NOT NULL,
            publicKey TEXT NOT NULL,
            sensorIdx INTEGER NOT NULL,
            value INTEGER NOT NULL,
            readingType INTEGER NOT NULL, 
            readingUnit INTEGER NOT NULL,
            exponent INTEGER NOT NULL,
            primary key (createdAt, producerUid, sensorIdx)
         );
         CREATE TABLE log_uint64 ( 
            createdAt INTEGER NOT NULL,
            producerUid INTEGER NOT NULL,
            publicKey TEXT NOT NULL,
            sensorIdx INTEGER NOT NULL,
            value INTEGER NOT NULL,
            readingType INTEGER NOT NULL, 
            readingUnit INTEGER NOT NULL,
            exponent INTEGER NOT NULL,
            primary key (createdAt, producerUid, sensorIdx)
         );
         CREATE TABLE log_int64 ( 
            createdAt INTEGER NOT NULL,
            producerUid INTEGER NOT NULL,
            publicKey TEXT NOT NULL,
            sensorIdx INTEGER NOT NULL,
            value INTEGER NOT NULL,
            readingType INTEGER NOT NULL, 
            readingUnit INTEGER NOT NULL,
            exponent INTEGER NOT NULL,
            primary key (createdAt, producerUid, sensorIdx)
         );
         `,
        "down":""
    }
]
export { sqliteMigrations };