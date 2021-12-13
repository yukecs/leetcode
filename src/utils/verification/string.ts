import {regMail,regTel} from './constant'
import {IAccountType} from './types'


export const isHasChinese =(str:string):Boolean=>{
    if (escape(str).indexOf('%u') != -1) {
        return true;
    }
    return false;
}

export const getAccountType = (account:string):IAccountType|''=>{
    if(regMail.test(account)){
        return 'mail'
    }else if(regTel.test(account)){
        return 'tel'
    }else{
        return '';
    }
}