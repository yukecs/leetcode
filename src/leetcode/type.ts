/**
 * 与leetcode typescript类型一致
 */

/**
 * Definition for singly-linked list.
 * 单链表的定义。
 */
export class ListNode {
    val: number
    next: ListNode | null
    constructor(val?: number, next?: ListNode | null) {
        this.val = (val === undefined ? 0 : val)
        this.next = (next === undefined ? null : next)
    }
}