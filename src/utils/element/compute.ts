interface DomRect {
  left: number;
  top: number;
  width: number;
  height: number;
}

//是否相交或包含
function isDomIntersect(domRect1: DomRect, domRect2: DomRect) {
  return ![
    domRect1.left + domRect1.width < domRect2.left ||
      domRect1.top + domRect1.height < domRect2.top ||
      domRect2.left + domRect2.width < domRect1.left ||
      domRect2.top + domRect2.height < domRect1.top,
  ];
}

//计算两个元素的距离
function getOffsetOfTwoEls(el1:Element,el2:Element):any {
    const {left:left1, top:top1} = el1.getBoundingClientRect()
    const {left:left2,top:top2} = el2.getBoundingClientRect()
    return {left:left1-left2, top:top1-top2}
}
