
import {getHtml,getHtmlRemoveLineBreaks} from './utils/html'
import {isDateBefore} from './lib/dayjs'

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
        images,
        length:images.length
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
    
            const timeMatches = data.match(/(?<=首次审核通过：).+?(?=;)/)
            let temp = timeMatches?timeMatches[0]:''
            const temp1 = temp.match(/\d+-\d+-\d+ \d+:\d+:\d+/)
            const time = temp1?temp1[0]:''
    
            return{
                url,title,text,img,time
            }
        }
    }
}


export async function getNewZK(url:string,ordDate:Date){

    url =url.replace(/\?.+/,"")

    let images = []
    let title =''

    let page:number = 0

    await getZKNewDatas(url,ordDate)
    

    return {
        url,
        title,
        images,
        length:images.length
    }

    async function getZKNewDatas(url:string,ordDate:Date){
        page++
        // console.log(page)
        let html = await getHtmlRemoveLineBreaks(url+'?p='+page)
        // console.log(html)
        title = title||getTitle(html)
    
        const datas = getData(html)
        if(datas&&datas.length>0){
            const newDatas =datas.filter(e=>isDateBefore(ordDate,getImageData(e).time))
            // console.log(newDatas)
            if(newDatas&&newDatas.length>0){
                images=images.concat(newDatas.map(e=>getImageData(e)))
                if(newDatas.length ==datas.length){
                    return await getZKNewDatas(url,ordDate)
                }
            }
            
            
            
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
    
            const timeMatches = data.match(/(?<=首次审核通过：).+?(?=;)/)
            let temp = timeMatches?timeMatches[0]:''
            const temp1 = temp.match(/\d+-\d+-\d+ \d+:\d+:\d+/)
            const time = temp1?temp1[0]:''
    
            return{
                url,title,text,img,time
            }
        }
    }
}

// (async()=>{
//     const res = await getZK('https://dxdstudio.zcool.com.cn/')
//     console.log(res)
    
// })()



export async function getWorks(url:string){
    let html = await getHtmlRemoveLineBreaks(url)
    const pic =getPic(html)
    // console.log(getUrls(pic))

    function getPic(html:string){
        const matches = html.match(/(?<=pic: ").+?(?=")/)
        return matches?matches[0]:''
    }

    function getUrls(pic:string){
        const matches = pic.match(/https:.+?.(jpg|png)/g)
        if(matches){
            return matches.splice(1,matches.length-1)
        }
    }
}

// (async()=>{
//     const res = await getWorks('https://www.zcool.com.cn/work/ZNDczNDgwNTI=.html')
// })()

(async()=>{
    const res = await getNewZK('https://lingdongps.zcool.com.cn/',new Date('2021-11-31'))
    console.log(res)
})()

// getNewZK