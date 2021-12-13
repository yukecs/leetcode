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
        const text = await getHtml('https://huaban.com/boards/15197806/')
        console.log(text)
        const reg:RegExp|String = "\\{\"pin_id\":(\\d+),.+?\"key\":\"(.+?)\",.\"type\":\"image/(.+?)\","
        let matches = text.match(reg)
        console.log(matches)
    })()
}
