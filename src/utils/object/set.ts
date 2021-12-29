/**
 * 浅拷贝
 */
function copySet(set: Set<any>|any[]): Set<any> {
    let copy = new Set<any>();
    for (let i of set) {
      copy.add(i);
    }
    return copy;
}

function addAll(...args) {
    /**
 * 判断是否为set
 */
    for(let i of args){
      this.add(i);
    }
}
