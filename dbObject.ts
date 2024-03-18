import {getMine } from './db'
import { ObjectType } from './types';
class DBObject implements DBObject { 
    static tableName:string|null = null;
    static getMine(secretField: string|null=null):ObjectType[] { 
        if (!this.tableName) throw new Error('No tablename set');
        return getMine(this.tableName,secretField)
    }
}
export default DBObject;