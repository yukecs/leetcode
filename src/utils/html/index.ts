import axios from 'axios'

const instance = axios.create({
    timeout:5000
})

export function getHtml(url){
    return instance.get(url).then(res=>{
        return res.data
    })
}


export function getHtmlRemoveLineBreaks(url){
    return instance.get(url).then(res=>{
        return res.data.replace(/[\n\r]/g,"")
    })
}