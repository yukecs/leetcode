
export interface IImageViewer{
    /**
     * 元素缩放比例
     */
    scale:number,
    /**
     * 位置
     */
    position:{
      top:number,
      left:number
    }
}

export interface IScrollBar{
  scrollHeight:number,
  scrollTop:number,
  clientHeight:number
  scrollWidth:number,
  scrollLeft:number,
  clientWidth:number
}