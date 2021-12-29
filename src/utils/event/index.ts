import { regID, regClass } from '@/utils/rule'
//mouseEvent获取鼠标与容器左上角的距离

export function getOffsetOfEl(mouseEv, ElName) {
    // console.log(mouseEv)
    const { path, clientX, clientY,offsetX,offsetY } = mouseEv
    // console.log(path, clientX, clientY)

    let type = ''
    const name = ElName.slice(1, ElName.length)

    let res = {
        offsetX: -1,
        offsetY: -1,
    }

    //1.通过正则获取元素选择器类型
    if (regID.exec(ElName)) {
        type = 'id'
    } else if (regClass.exec(ElName)) {
        type = 'className'
    }

    if (path[0][type] === name) {
       res.offsetX = offsetX
       res.offsetY = offsetY
    }else{
        for(let i = 1; i<path.length; i++){
            if(path[i][type] === name){
                let el = path[i]
                let domRect = el.getBoundingClientRect()
                res.offsetX = clientX - domRect.left
                res.offsetY = clientY - domRect.top
            }
        }
    }

    // res = res.offsetX = -1?false:res

    // console.log(path[0][type])

    return res


    //
}

//mouseEvent获取鼠标在容器元素的比例

export const getScaleOfEl=(mouseEv, ElName)=>{
    const offsets = getOffsetOfEl(mouseEv, ElName)
    const width = document.querySelector(ElName).clientWidth
    const height = document.querySelector(ElName).clientHeight
    return {
        scaleX: offsets.offsetX/width,
        scaleY: offsets.offsetY/height
    }

}