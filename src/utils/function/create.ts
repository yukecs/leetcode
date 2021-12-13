/**
 * 创建防抖函数
 * @param {*} t 最小间隔时间
 * @param {*} callback 执行的函数
 * @returns 
 */
 export function createDelayCall(callback:Function,time:number = 1000,) {
    let isCall = false;
    return (...arr:any) => {
        !isCall && callback && callback(...arr);
        !isCall && setTimeout(() => isCall = false, time)
        isCall = true;
    }
}

/**
 * 创建节流函数
 * @param {*} t 多少时间内容执行一次
 * @param {*} callback 执行的函数
 * @returns 
 */
export function createThrottle(fn:Function, delay:number):Function {
    let canRun = true; 
    return function (...arr:any):void {
        if (!canRun) return;
        fn(...arr);
        canRun = false;
        setTimeout(() => {
            canRun = true;
        }, delay);
    };
}