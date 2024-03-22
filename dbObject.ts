import {getMine,getByAll } from './db.js'
import { DBObject as DBOT, ScalarType } from './types.js';
class DBObject<S extends DBOT> implements DBOT { 
    static tableName:string|null = null;
    static getMine<S extends DBObject<any>>(secretField: string|null=null):S[] { 
        const tname = this.tableName;
        if (!tname) throw new Error('No tablename set');
        return getMine(tname,secretField) as S[]
        
    }
    static getByAll<S extends DBObject<any>>( data: { [key: string]: ScalarType } ):S[] {
        const tname = this.tableName;
        if (!tname) throw new Error('No tablename set');
        return getByAll(tname, data) as S[]
    }
   
}
export default DBObject;
