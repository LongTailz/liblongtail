import { HashSize, HashType } from "./types.js";
import { createHash } from 'blake2';
export const getBlake2bHash = (hashSize: HashSize, data: Buffer):Buffer => { 
    const hash = createHash("blake2b",{digestLength: hashSize});
    hash.update(data);
    return hash.digest();
}
/*
const ret:PublicKey = {type: HashType.BLAKE2b, buf:hash.digest(), size: hashSize};
ret['size']=hashSize;
return ret;



    //return  ret;
    hash.digest();

}*/