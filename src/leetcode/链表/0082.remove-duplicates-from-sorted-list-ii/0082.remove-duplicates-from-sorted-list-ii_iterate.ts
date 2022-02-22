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

/**迭代 */
export function deleteDuplicates(head: ListNode | null): ListNode | null {
    var prehead = head
    var set = new Set<number>()
    var prev = new ListNode(-1)
    while(prehead!==null){
        /**将所有需要删除的元素放到set */
        set.add(prehead.val)
        prehead = prehead.next
    }
    prehead = head
    while(prehead!==null){
        
        if(set.has(prehead.val)){ /**删除需要删除的元素 */
            if(prev=== null){
                /**删除链头 */
                prehead = prehead.next
                head = prehead
            }else if(prev && prehead.next ){
                /**删除链中 */
                prev.next = prehead.next
                prehead = prehead.next
            }else{
                /**删除链尾 */
                prehead =new ListNode(-1)
            }
        }else{ /**无需删除 */
            prev = prehead
            prehead = prehead.next
        }
    }
    return head
};


