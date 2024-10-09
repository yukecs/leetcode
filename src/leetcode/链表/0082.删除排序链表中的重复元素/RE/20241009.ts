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

import {ListNode} from '../../../type'

/**迭代 RE PASS */
export function deleteDuplicates(head: ListNode | null): ListNode | null {
    if(!head){ return null}
    const prehead = new ListNode(-1)
    prehead.next = head
    let l1 = prehead
    while(l1.next){
        let l2 =l1.next
        const val = l2.val
        if(l2.next&&l2.next.val === val){
            while(l2.next&&l2.next.val === val){
                l2 = l2.next
            }
            l1.next = l2.next
        }else{
            l1 = l2
        }
    }
    return prehead.next
};