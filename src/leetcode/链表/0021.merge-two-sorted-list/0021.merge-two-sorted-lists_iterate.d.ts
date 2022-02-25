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

/**迭代 参考答案*/
declare function mergeTwoLists (l1: ListNode | null, l2: ListNode | null): ListNode | null;

/**迭代 第一次成功*/
declare function mergeTwoLists_first (l1: ListNode | null, l2: ListNode | null): ListNode | null;