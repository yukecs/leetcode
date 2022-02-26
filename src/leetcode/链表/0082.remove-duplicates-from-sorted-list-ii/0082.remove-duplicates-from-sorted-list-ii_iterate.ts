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

/**迭代 first success 时间复杂度(2n)*/
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

/**迭代 参考答案 时间复杂度(n)*/
var deleteDuplicates_2 = function(head: ListNode | null): ListNode | null {
    if (!head) {
        return head;
    }

    const dummy = new ListNode(0, head);

    let cur = dummy;
    while (cur.next && cur.next.next) {
        if (cur.next.val === cur.next.next.val) {
            const x = cur.next.val;
            while (cur.next && cur.next.val === x) {
                cur.next = cur.next.next;
            } 
        } else {
            cur = cur.next;
        }
    }
    return dummy.next;
};

