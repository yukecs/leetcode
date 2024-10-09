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

function partition(head: ListNode | null, x: number): ListNode | null {
    //解题思路 一次遍历分隔生成两个链表，后将链表相连 时间复杂度O(n)
    let l_min = new ListNode(-1)
    let l_max = new ListNode(-1)
    let cur = head
    let l_min_dummy = new ListNode(0,l_min)
    let l_max_dummy = new ListNode(0,l_max)
    // 遍历head  
    while(cur){
        if(cur.val <x){
            l_min.next = cur
            l_min = l_min.next
        }else{
            l_max.next = cur
            l_max = l_max.next
        }
        cur = cur.next
    }
    //把l_max的尾链断开否则有可能形成环
    l_max.next = null
    //把l_min的链断接到l_max_dummy
    l_min.next = l_max_dummy.next.next
    return l_min_dummy.next.next
};