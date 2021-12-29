interface DomRect {
  left: number;
  top: number;
  width: number;
  height: number;
}

/**
 * 框选的功能类
 */

interface FrameSelection{
    e: MouseEvent,
    map: Map<number, DomRect>,
    el: Element,
    mousemoveCallback?:Function
}


import { boxSelection } from "@/utils/boxSelection.js";

import { getOffsetOfEl } from "./extension/utils/event";
import './frame-selection.css'


export const frameSelection = (
    datas:FrameSelection
)=> {
  // console.log(e)
  // console.log(el.scrollTop)
  // console.log(map)

  const {e,map,el,mousemoveCallback} = datas

  const id = `#${el.id}`

  const { offsetX, offsetY } = getOffsetOfEl(e, `#${el.id}`);
  const baseTop = el.scrollTop;
  const baseLeft = el.scrollLeft;

  const showFrame = {
    x: offsetX+baseLeft,
    y: offsetY+baseTop,
    width: 0,
    height: 0,
  };

  const clientX = e.clientX,
    clientY = e.clientY;

  document.addEventListener('mousemove', handleMousemove,true);
  document.addEventListener('mouseup', handleMouseup,true);

  const div = document.createElement("div");
  div.style.cssText +=
    ";position: absolute;border: 1px solid #2a98ff;background:rgba(42,152,255,0.2);z-index:1002";
    
  el.classList.add("frame-selection");

  
  let isAppended = false;

//   console.log(offsetY);

  /**
   * 设置元素位置
   * @param {*} move
   */
  function setFramePosition(e) {

    let width =e.clientX-clientX
    let height =e.clientY-clientY

    const  { scrollTop, scrollLeft } = document.querySelector(id);


    const newData = {
        width:0,
        height:0,
        left:0,
        top:0,
    }

    if(width > 0){
        newData.width = width;
        newData.left = showFrame.x;
    }else{
        newData.width = -width;
    //    console.log(showFrame.x-width) 
        newData.left = showFrame.x+width;
    }

    
    if(height > 0){
        newData.height =scrollTop-baseTop+ height;
        newData.top =showFrame.y;
    }else{
        // console.log(scrollTop,baseTop)
        let temp = baseTop-scrollTop-height
        newData.height = temp;
        newData.top = (showFrame.y-temp);
    }

    div.style.width = newData.width + "px";
    div.style.height = newData.height + "px";
    div.style.left = newData.left + "px";
    div.style.top = newData.top + "px";

    const selects = [];
    
    // console.log(newData,map[3],map[4])
    
    // 此处应该节流
    for(let [i,val] of map){
        // console.log(newData, map[i])
        // console.log(isDomIntersect(newData, map[i]))
        if(isDomIntersect(newData, val)){
            selects.push(i)
            // console.log()
        }
    }

    // console.log(selects)

    mousemoveCallback(selects)
  }

  function handleMousemove(e){
    // const { offsetX, offsetY } = getOffsetOfEl(e, `#${el.id}`);
    // console.log(e.clientX-clientX,e.clientY-clientY);
    // console.log(offsetX-showFrame.x, offsetY-showFrame.y);
    if(!isAppended){
        console.log(isAppended)
        isAppended =true
        el.appendChild(div);
    }
    setFramePosition(e);
  }

  function handleMouseup(e){
    document.removeEventListener('mousemove', handleMousemove,true);
    document.removeEventListener('mouseup', handleMouseup,true);
    div.remove()
  }
  // return boxSelection(e,(position)=>{
  //     console.log(position)
  // })
  return []

  function isDomIntersect(domRect1: DomRect, domRect2: DomRect) {
    return !(
      domRect1.left + domRect1.width < domRect2.left ||
        domRect1.top + domRect1.height < domRect2.top ||
        domRect2.left + domRect2.width < domRect1.left ||
        domRect2.top + domRect2.height < domRect1.top
    );
  }
};
