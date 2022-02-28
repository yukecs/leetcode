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

import { ListNode } from '../../type'

export function reverseBetween(head: ListNode | null, left: number, right: number): ListNode | null {
    if(!head||left === right){
        return head
    }
    let l = new ListNode(-1,head)
    let prehead = l;
    for(let i = 1 ; i<left; i++){
        prehead = prehead.next
    }

    /**左边 */
    let l1 = prehead

    let cur =l1.next
    let rL:ListNode | null = null
    for(let i = 0;i<right-left;i++){
        rL = new ListNode(cur.val,rL)
        cur = cur.next
    }
    l1.next = rL
    
    return l.next
};