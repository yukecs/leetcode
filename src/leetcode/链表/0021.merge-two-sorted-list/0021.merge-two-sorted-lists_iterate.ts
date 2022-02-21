// class ListNode {
//     val: number
//     next: ListNode | null
//     constructor(val?: number, next?: ListNode | null) {
//         this.val = (val === undefined ? 0 : val)
//         this.next = (next === undefined ? null : next)
//     }
// }
import {ListNode} from '../type'

/**迭代 参考答案*/
export const mergeTwoLists = function (l1: ListNode | null, l2: ListNode | null) {
    const prehead = new ListNode(-1);
  
    let prev = prehead;
    while (l1 != null && l2 != null) {
      if (l1.val <= l2.val) {
        prev.next = l1;
        l1 = l1.next;
      } else {
        prev.next = l2;
        l2 = l2.next;
      }
      prev = prev.next;
    }
    prev.next = l1 === null ? l2 : l1;
  
    return prehead.next;
};

/**迭代 第一次成功*/
export function mergeTwoLists_first(l1: ListNode | null, l2: ListNode | null): ListNode | null {
    if(l1 === null) return l2;
    if(l2 === null) return l1;
    let prev: ListNode | null = null
    let prehead: ListNode | null = l1
    while(l2!==null){
        let next = l2.next
        if(l2.val<prehead.val){
            l2.next = prehead
            if(prev){
                prev.next = l2
            }else{
                l1 = l2
            }
            prev = l2
        }else{
            while(prehead.next&&l2.val>prehead.next.val){
                prev = prehead
                prehead = prehead.next
            }
            if(!prehead.next){
                prehead.next = l2
                break;
            }
            l2.next = prehead.next
            prehead.next = l2

        }
        l2 = next
    }

    return l1
};

