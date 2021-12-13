

function getNumberOfDays(date){//获得天数
    //date1：开始日期，date2结束日期
    var a1 = Date.parse(new Date());
    var a2 = Date.parse(new Date(date));
    var day = parseInt((a1-a2)/ (1000 * 60 * 60 * 24));//核心：时间戳相减，然后除以天数
    return day
};
console.log(getNumberOfDays(new Date("2021-10-21T11:47:12.000Z")));
