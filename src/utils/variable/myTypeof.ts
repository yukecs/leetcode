export function myTypeof(target:any):string {
    let res = typeof target
    var temp = {
        '[object Array]': 'array',
        '[object Object]': 'object',
        '[object Number]': 'number - object',
        '[object String]': 'string - object',
        '[object Boolean]': 'boolean - object',
    }
    if(target === null){
        return 'null'
    }else if(res === 'object'){
        var str: string = Object.prototype.toString.call(target)
        return temp[str]
    }else{
        return res
    }
}