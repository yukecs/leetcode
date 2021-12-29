/**
 * 获取滚动距离
 * @param el HTMLElement
 * @returns 
 */
export function getScrollTop(el?: HTMLElement): number {
    let scrollTop = 0;
    if(el){
        scrollTop = el.scrollTop;
    }
    else if (document.documentElement && document.documentElement.scrollTop) {
        scrollTop = document.documentElement.scrollTop;
    } else if (document.body) {
        scrollTop = document.body.scrollTop;
    }
    return scrollTop;
}

/**
 * 获取视窗高度
 */
export function getClientHeight()
{
  var clientHeight=0;
  if(document.body.clientHeight&&document.documentElement.clientHeight)
  {
  var clientHeight = (document.body.clientHeight<document.documentElement.clientHeight)?document.body.clientHeight:document.documentElement.clientHeight;
  }
  else
  {
  var clientHeight = (document.body.clientHeight>document.documentElement.clientHeight)?document.body.clientHeight:document.documentElement.clientHeight;
  }
  return clientHeight;
}


/**
 * 判断元素是否已经出现
 * @param dom 元素
 * @param offset 调整值
 * @returns 
 */
export function isDomOver(dom:HTMLElement,offset?:number):Boolean {
    let bl:Boolean =false
    let oset:number = offset?offset:0
    if(getScrollTop()+getClientHeight()-oset>=dom.offsetTop){
        bl =true
    }
    return bl
}