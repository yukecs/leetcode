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

/**迭代 first success */
export function partition(head: ListNode | null, x: number): ListNode | null {
    
    let l1 = new ListNode(-1,head)
    let prehead = l1
    let t:ListNode|null = null
    /**1.找到第一个大于等于x的节点的前面 */
    while(prehead.next){
        if(prehead.next.val<x){
            prehead = prehead.next
        }else{
            t = prehead
            break;
        }
    }
    if(!t){
        return l1.next
    }
    prehead = t.next
    /**2. */
    while(prehead.next){
        if(prehead.next.val<x){
            let temp = prehead.next.next
            prehead.next.next = t.next
            t.next = prehead.next
            prehead.next = temp
            t = t.next
        }else{
            prehead = prehead.next
        }
    }
    return l1.next
};