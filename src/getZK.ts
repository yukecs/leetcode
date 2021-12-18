
import {getHtml,getHtmlRemoveLineBreaks} from './utils/html'

interface ZKDatas{
    title: string,
    url:string,
    length:number,
    thumbnail:string,
    text:string
}

export async function getZK(url:string){

    url =url.replace(/\?.+/,"")

    let images = []
    let title =''

    let page:number = 0

    await getZKDatas(url)
    

    return {
        url,
        title,
        images
    }

    async function getZKDatas(url:string){
        page++
        // console.log(page)
        let html = await getHtmlRemoveLineBreaks(url+'?p='+page)
        // console.log(html)
        title = title||getTitle(html)
    
        const datas = getData(html)
        if(datas&&datas.length>0){
            images=images.concat(datas.map(e=>getImageData(e)))
            return await getZKDatas(url)
        }
        
        function getTitle(html:string){
            const matches = html.match(/(?<=data-name=").+?(?=")/)
            return matches?matches[0]:''   
        }
    
        function getData(html:string){
            const matches = html.match(/\<div class="card-box".+?(?=(\<div class="card-box"|\<!-- fNGYE翻页 --\>))/g)
            return matches?matches:[]
        }
    
        function getImageData(data:string){
            const urlMatches = data.match(/(?<=\<a href=").+?(?=")/)
            const url = urlMatches?urlMatches[0]:''
    
            const titleMatches = data.match(/(?<=\<a href=".+?title=").+?(?=")/)
            const title = titleMatches?titleMatches[0]:''
    
    
            const textMatches = data.match(/(?<=\<p.+class="card-info-type".+?title=").+?(?=")/)
            const text = textMatches?textMatches[0]:''
    
            const imgMatches = data.match(/(?<=\<img src=").+?(?=")/)
            const img = imgMatches?imgMatches[0]:''
    
            const timeMatches = data.match(/(?<=最近更新时间：).+?(?=;)/)
            let temp = timeMatches?timeMatches[0]:''
            const temp1 = temp.match(/\d+-\d+-\d+ \d+:\d+:\d+/)
            const time = temp1?temp1[0]:''
    
            return{
                url,title,text,img,time
            }
        }
    }
}


(async()=>{
    const res = await getZK('https://www.zcool.com.cn/u/13512105')
    console.log(res)
})()

