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

/** 迭代 RE PASS */
export const mergeTwoLists = function (
    list1: ListNode | null,
    list2: ListNode | null
) {
    
    
    // 创建一个空节点
    let preHead = new ListNode(-1);
    //创建当前节点
    let current = preHead

    while (list1 !== null && list2 !== null) {
        if(list1.val < list2.val){
            current.next = list1
            list1 = list1.next
        }else{
            current.next = list2
            list2 = list2.next
        }

        current = current.next
        
    }

    if(list1 === null){
        current.next = list2
    }else if(list2 === null ){
        current.next = list1
    }

    return preHead.next
};
