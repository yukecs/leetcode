import axios from 'axios'

const instance = axios.create({
    timeout:5000
})

function getHtml(url){
    return instance.get(url).then(res=>{
        return res.data
    })
}

export function test(){
    (async()=>{
        const text = await getHtml('http://www.shuquge.com/txt/108449')
        console.log(text)
    })()
}
