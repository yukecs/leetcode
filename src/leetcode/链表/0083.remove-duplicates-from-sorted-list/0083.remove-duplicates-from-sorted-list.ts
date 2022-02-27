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

/** 迭代 fisrt success */
export function deleteDuplicates(head: ListNode | null): ListNode | null {
   if(!head){
      return null
   }
   let prehead = new ListNode(-1)
   let prev = head
   while (prev.next !== null) {
      prehead = prev.next
      while (prehead && prehead.val === prev.val) {
         prehead = prehead.next
      }
      prev.next = prehead
      if(prev.next){
         prev = prev.next
      }
   }
   return head
};

/** 迭代 参考答案 */
export const deleteDuplicates_2 = function(head: ListNode | null): ListNode | null {
   var cur = head;
   while(cur && cur.next) {
       if(cur.val == cur.next.val) {
           cur.next = cur.next.next;
       } else {
           cur = cur.next;
       }
   }
   return head;
};