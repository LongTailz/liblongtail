import * as types from './types.js';
import fs from 'fs';
(async()=>{
    const fp = fs.createWriteStream('ctypes.h');
    fp.write("enum class SensorType {\r\n");
    let vals = [];
    for (const type in Object.keys(types.SensorTypes)) {
        if (types.SensorTypes[type]) { 
            vals.push('\t'+types.SensorTypes[type]+'='+type)
        }
    }
    fp.write(vals.join(',\r\n')+'\r\n');
    fp.write('};\r\n');

    //
    fp.write("enum class ReadingType:uint32_t {\r\n");
    vals = [];
    for (const type in Object.keys(types.ReadingTypes)) {
        if (types.ReadingTypes[type]) { 
            vals.push('\t'+types.ReadingTypes[type]+'='+type)
        }
    }
    fp.write(vals.join(',\r\n')+'\r\n');
    fp.write('};\r\n');

       //
       fp.write("enum class ReadingUnit:uint32_t {\r\n");
       vals = [];
       for (const type in Object.keys(types.ReadingUnits)) {
           if (types.ReadingUnits[type]) { 
               vals.push('\t'+types.ReadingUnits[type]+'='+type)
           }
       }
       fp.write(vals.join(',\r\n')+'\r\n');
       fp.write('};\r\n');
    
    fp.close();
    console.log('got here');
})();

