import {sqliteMigrations} from "./migrations.js";
import {migrate as dbMigrate} from "./better-sqlite3-migrations/src/migrate.js";
import betterSqlite from "better-sqlite3"
import { ScalarType } from "./types.js";

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
const getByAll = (tableName: string,data: { [key: string]: ScalarType })=> { 
    console.log('doing getbyall');
    switch (dbType) { 
        case 'sqlite':
        default:
            return getByAll_sqlite(tableName, data);
    }
}
const insert = (tableName: string, data: { [key: string]: string }) => { 
    switch (dbType) { 
        case 'sqlite':
        default:
            return insert_sqlite(tableName, data);
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
    const result = db.prepare('select * from '+tableName+' WHERE '+temp.join(' AND ')+';').get(temp2);
    return result;
}

const insert_sqlite = (tableName: string, data: { [key: string]: string }) => { 
    const temp = [];
    const temp2 = [tableName];
    const temp3 = [];
    for (const key in data) { 
        temp.push('`'+key+'`');
        temp2.push(data[key] || '');
        temp3.push('?');
    }
    const result = db.prepare('insert into ? ('+temp.join(',')+') VALUES ('+temp3.join(',')+')').get(temp2);
    console.log(result);
    const insertResult = db.prepare('select last_insert_rowid()').get();
    console.log(insertResult);
    return result;
}
export {migrate, getBy, getByAll, insert}