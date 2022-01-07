//惰性单例模式-闭包
export default function (fn){
    let result

    return function() {
        if(typeof fn == 'function'){
            return result || (result = fn.apply(this,arguments))
        }else if(typeof fn == 'object'){
            return result || (result = fn)
        }  
    }
}

//export const obj = getSingle(new Object())
//export const fn = getSingle(Fn)