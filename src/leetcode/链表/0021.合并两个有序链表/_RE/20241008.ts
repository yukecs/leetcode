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
import { ListNode } from "../../../type";

/**迭代 参考答案*/
export const mergeTwoLists = function (
    l1: ListNode | null,
    l2: ListNode | null
) {
    // 创建一个空节点
    const prevHead = new ListNode();
    while (l1 !== null || l2 !== null) {
        if(l1.val < l2.val){
            
        }

    }
};
