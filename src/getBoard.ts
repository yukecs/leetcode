import {getHtml} from './utils/html'

interface Broad{
    url: string
    title:string
    length:number
    images:object[]
}

async function getBoard(url: string):Promise<Broad> {
    let title = 'title'
    url = url.replace(/\?.+/, "");
    let images = await getBoardImages(url)
    
    return {
        url,
        title: title,
        length:images.length,
        images: images
    }

    async function getBoardImages(baseUrl:string,oldArr?:string[],pin_id?:String|Number){
        let url = pin_id?`${baseUrl}/?max=${pin_id}&limit=100&wfl=1`:`${baseUrl}/?limit=100&wfl=1`
        let html = await getHtml(url)
        const reg:RegExp|String = /\{"pin_id":\d+?.+?"type":"image.+?"text_meta":.+?\}/g
        let arr = pin_id?oldArr:[]
        if(!pin_id){
            title = getTitle(html)
        }
        let matches = html.match(reg)
        if(matches){
           arr =arr.concat(matches)
        
           let pin_id = getPinId(matches[matches.length-1])
            // console.log(JSON.parse())
           return getBoardImages(baseUrl,arr,pin_id)
        }else{
            // console.log(arr[arr.length-2])
            const res =arr.map(e=>{
                const url = getUrl(e)
                return {
                    id:getPinId(e),
                    text:getText(e),
                    url:url,
                    thumbnail:url+'_/fw/480/format/webp'
                }
            })
            return res
        }
    
        function getPinId(str:string):string{
            // const matches = (str.match(/"pin_id":\d+/)[0]).match(/\d+/)
            const matches =str.match(/(?<="pin_id":).+?(?=,)/)
            return matches?matches[0]:''
        }
        function getText(str:string):string{
            const matches =str.match(/(?<="raw_text":").+?(?=",)/)
            return matches?matches[0]:''
        }
        function getTitle(html:string):string{
            const matches =html.match(/(?<=\<meta name="keywords" content=").+?(?=")/)
            return matches?matches[0]:''
        }
        function getUrl(str:string):string{
            const matches =str.match(/(?<="key":").+?(?=")/)
            return matches?'https://hbimg.huabanimg.com/'+matches[0]:''
        }
    }
}




// (async()=>{
//     const res =await getBoard('https://huaban.com/boards/931234')
//     console.log(res)
// })()


