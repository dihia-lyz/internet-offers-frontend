/*export function getFromStorage(key){
    if (!key){
        return null;
    }

    try{
        const valueStr=localStorage.getItem(key);
        if (valueStr) {return JSON.parse(valueStr);
        }
    }catch(err){
        return null;
    }
}

export function setInStorage(key,obj){
    if(!key){
        console.error('error: key is missing');
    }

    try{
        localStorage.setItem(key,JSON.stringify(obj));
    }catch (err){
        console.error(err);
    }

}*/
export default function getFromStorage(key){
   
    try{
        const token=localStorage.getItem(key);
        console.log(token,"storage");
        if (token) {return token;
        }
    }catch(err){
        console.log("555");
        return null;
    }

}

