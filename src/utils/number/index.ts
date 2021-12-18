interface GetRandomNumber{

}

export function getRandomNumber(options:GetRandomNumber){
    return Math.floor((Math.random()+Math.floor(Math.random()*9+1))*Math.pow(10,10-1));
}