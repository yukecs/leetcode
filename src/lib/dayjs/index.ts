import dayjs,{ConfigType} from "dayjs";

/**
 * 通过dayjs返回YYYY-MM-DD的日期
 * @param date dayjs构造器参数或无参，无参代表今天
 * @returns YYYY-MM-DD格式的日期
 */
export function YYYYMMDD(date?:ConfigType) {
    return dayjs(date).format("YYYY-MM-DD");
}

export function YYYYMMDDHHmmss(date?:ConfigType) {
    return dayjs(date).format("YYYY-MM-DD HH:mm:ss");
}
/**
 * 获取两个日期之间相差的天数
 * @param prevDate 当前的日期
 * @param date 之前日期
 * @returns 
 */
export function getDaysBetween(prevDate:ConfigType,date:ConfigType){
    return (dayjs(prevDate).diff(date,'day'))
}

/**
 * 比较两个日期的大小，若Date1大，返回false
 * @param Date1 
 * @param Date2 
 * @returns 
 */
export function isDateBefore(Date1:ConfigType,Date2:ConfigType){
    return dayjs(Date1).isBefore(dayjs(Date2))
}

// console.log(YYYYMMDDHHmmss(new Date()))/
// console.log(isDateBefore('2021-11-30 15:42:06','2021-2-1'))
// console.log(new Date('2021-11-30 15:42:06'))
