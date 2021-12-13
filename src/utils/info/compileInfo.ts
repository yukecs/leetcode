export type IComplileInfo = 'dev' | 'prod' 

export function getComplileInfo():IComplileInfo{
    let cInfo:IComplileInfo = 'prod'
    if(import.meta.env.DEV){
        cInfo = 'dev'
    }
    return cInfo
}