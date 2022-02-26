/**
 * Definition for singly-linked list.
 * class ListNode {
 *     val: number
 *     next: ListNode | null
 *     constructor(val?: number, next?: ListNode | null) {
 *         this.val = (val===undefined ? 0 : val)
 *         this.next = (next===undefined ? null : next)
 *     }
 * }
 */

import {ListNode} from '../../type'

/**迭代 first success*/
export function deleteDuplicates(head: ListNode | null): ListNode | null {
    var prehead = head
    var set = new Set<number>()
    var deleteSet = new Set<number>()
    var l1 = new ListNode(-101,head)
    while(prehead!==null){
        /**将所有需要删除的元素放到deleteSet */
        if(set.has(prehead.val)){
            deleteSet.add(prehead.val)
        }
        set.add(prehead.val)
        prehead = prehead.next
    }
    prehead = l1
    while(prehead.next){
        if(deleteSet.has(prehead.next.val)){
            prehead.next = prehead.next.next
        }else{
            prehead = prehead.next
        }
    }

    return l1.next
};


