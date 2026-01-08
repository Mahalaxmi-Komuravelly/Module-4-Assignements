export function checkPrime(n){
    if(n < 1) return false;
    let count=0;
    for(let i=1;i<=n ; i++){
        if(n%i === 0){
            count++;
        }
    }
    if(count <= 2){
        return true;
    }
    else{
        return false;
    }
}