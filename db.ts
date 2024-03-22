import {sqliteMigrations} from "./migrations.js";
import {migrate as dbMigrate} from "@blackglory/better-sqlite3-migrations";
import betterSqlite from "better-sqlite3"
import { Nodex, ObjectType, Producer, ScalarType, Log, Sensor, LogTypes } from "./types.js";
import DBObject from "./dbObject.js";
import Nodex_Model from "./models/nodex.js";
import Producer_Model from "./models/producer.js";
import Log_Model from "./models/log.js";
import Sensor_Model from "./models/sensor.js";

const db = new betterSqlite('./dist/sqlite.db', { verbose: console.log });
db.pragma('journal_mode = WAL');
let dbType='sqlite';
const migrate = () => { 
    switch (dbType) { 
        case 'sqlite':
        default:
            return migrate_sqlite();
    }
}
const getByAll = (tableName: string,data: { [key: string]: ScalarType }):any[]=> { 
    console.log('doing getbyall');
    let result;
    switch (dbType) { 
        case 'sqlite':
        default:
            result = getByAll_sqlite(tableName, data);
            break;
    }
    return result;
}
const insert = (tableName: string, data: { [key: string]: string }) => { 
    switch (dbType) { 
        case 'sqlite':
        default:
            return insert_sqlite(tableName, data);
    } 
}
const getMine = (tableName: string, secretField: string|null): any[] => { 
    switch (dbType) { 
        case 'sqlite':
        default:
            return getMine_sqlite(tableName, secretField);
    } 
}

const getMine_sqlite = (tableName: string, secretField: string|null): any[] => { 

if (!secretField) secretField = 'secretKey';
const result = db.prepare('SELECT * FROM `'+tableName+'` WHERE (`'+secretField+'` IS NOT NULL AND `'+secretField+'` != \'\')').all();
if (!result || !result.length) return [];

return getTypedRows(tableName, result);
}

const makeTyped = (tableName: string, row: unknown) => { 
    return getTypedRows(tableName, [row])[0];
}

const getTypedRows = (tableName: string, result: unknown[]) => {
    switch (tableName) { 
        case Nodex_Model.tableName:
            const ret1:Nodex_Model[] = [];
            console.log('Building array of Nodex_Models')
            for (const i of result) { 
                ret1.push(new Nodex_Model(i as Nodex,false));
            }
            return ret1;
        case Producer_Model.tableName:
            const ret2:Producer_Model[] = [];
            for (const i of result) { 
                ret2.push(new Producer_Model(i as Producer,false));
            }
            return ret2;
    
        case Sensor_Model.tableName:
            const ret4:Sensor_Model[] = [];
            for (const i of result) { 
                ret4.push(new Sensor_Model(i as Sensor, false ))
            }
            return ret4;
        default:
            const ret:ObjectType[] = [];
            for (const i of result) { 
                ret.push(i as ObjectType);
            } 
            return ret;
                
            
        }
}
const migrate_sqlite = () => { 
    let databaseVersion = db.prepare('PRAGMA user_version;').get() as { user_version: number }
    console.log("Database Version: ");
    console.log(databaseVersion);  
    console.log(dbMigrate)
    dbMigrate(db, sqliteMigrations);
    databaseVersion =  db.prepare('PRAGMA user_version;').get() as { user_version: number }
    console.log("Database Version: ");
    console.log(databaseVersion);
    
    console.log('got here');
}
const getBy = (tableName: string, key: string, value: string) => { 
    const search:{ [key: string]: string } = {};
    search[key]=value;
    return getByAll(tableName,search);
}

const getByAll_sqlite = (tableName: string, data: { [key: string]: ScalarType }) => { 
    const temp = [];
    const temp2:ScalarType[] = [];
    console.log(data);
    //for (const i of keys) { 
    for (const key in data) { 
        temp.push('`'+key+'` = ?')
        temp2.push(data[key] || '');
    }
    console.log('select * from ? WHERE '+temp.join(' AND ')+';');
    console.log(temp2);
    const result = db.prepare('select * from '+tableName+' WHERE '+temp.join(' AND ')+';').all(temp2);
    return getTypedRows(tableName, result);
    return result;
}

const insert_sqlite = (tableName: string, data: { [key: string]: string }) => { 
    const temp:ScalarType[] = [];
    const temp2:ScalarType[] = [];
    const temp3:ScalarType[] = [];
    for (const key in data) { 
        temp.push('`'+key+'`');
        let val = data[key];
        if (typeof val == 'object' || typeof val == 'number') val = String(val);
        temp2.push(val || '');
        temp3.push('?');
    }
    const result = db.prepare('insert into '+tableName+' ('+temp.join(',')+') VALUES ('+temp3.join(',')+')').run(temp2);
    
    
    if (!result.changes) { 
        throw new Error('Failed to create SQLite row: '+JSON.stringify(result));
    }
    return result.lastInsertRowid;
    
   
}
export {migrate, getBy, getByAll, insert, getMine}
