export const getCreateDate = (date:string)=>{
    if(date){
        let result = date.match(/(\S*)T/)[1];
        return result
    }
}

export function getNumberOfDays(date:string){//获得天数
    //date1：开始日期，date2结束日期
    var a1 = Date.parse(new Date());
    var a2 = Date.parse(new Date(date));
    var day = parseInt((a1-a2)/ (1000 * 60 * 60 * 24));//核心：时间戳相减，然后除以天数
    return day
};


