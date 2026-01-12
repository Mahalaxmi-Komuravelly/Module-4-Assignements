import fs,{readFileSync} from "fs";

export const readData = ()=>{
    const data = fs.readFileSync("./Data.txt",{encoding:"utf-8"});
    return data;
}
