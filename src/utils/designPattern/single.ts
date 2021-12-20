//惰性单例模式
export default function (fn:Function|object){
    let result

    return function() {
        if(typeof fn == 'function'){
            return result || (result = fn.apply(this,arguments))
        }else if(typeof fn == 'object'){
            return result || (result = fn)
        }  
    }
}