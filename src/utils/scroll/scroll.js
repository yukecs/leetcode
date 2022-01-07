/**
 * 移动到元素位置
 * @param {*} elName 元素名
 * @param {*} wrapName wrap名（可选）
 * @param {*} offsetY 偏移量（可选）
 * @param {*} callback 移动结束后回调函数（可选）
 */
export function scrollToElement(id, top, callback) {
    let wrap = document.getElementById(id)
    if (wrap.scrollTop == top) {
        callback && callback()
        return
    }
    wrap && wrap.scrollTo({
        top: top,
        behavior: "smooth"
    })

    // console.log(el.getBoundingClientRect().top,wrap.getBoundingClientRect().top)
    wrap.scrollTo({
        top: top,
        behavior: "smooth"
    })
    //滚动完触发事件
    let scrollCallBack = function (e) {
        if (wrap.scrollTop == top) {
            callback && callback()
            wrap.removeEventListener('scroll', scrollCallBack, false)
        }
    }
    if (callback && typeof callback === 'function') {
        wrap.addEventListener('scroll', scrollCallBack, false)
    }
}


/**
 * 滚动指定id的滚动条到指定位置
 * @param {*} id 元素id
 * @param {*} top 位置
 */
export function scrollTo(id, top) {
    let dom = document.getElementById(id)
    dom && dom.scrollTo({
        top: top,
        behavior: "smooth"
    })
}