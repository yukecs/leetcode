import {ListNode} from '../type'
import {deleteDuplicates as test_0082} from '../../../leetcode/链表/0082.remove-duplicates-from-sorted-list-ii/0082.remove-duplicates-from-sorted-list-ii_iterate'
/**
 * 通过数组创建单链表
 */
export function createSingleLinkedList(vals:number[]):ListNode{
    let head = new ListNode(-1)
    let prehead = head
    vals.forEach((val,i)=>{
        prehead.next = new ListNode(val)
        prehead = prehead.next
    })
    return head.next
}

/**
 * 单链表转数组
 */
export function singleLinkedListToArray(l1:ListNode):number[]{
    let array:number[] = []
    while(l1){
        array.push(l1.val)
        l1 = l1.next
    }
    return array
}

export const main =()=>{
    let testArray = [1,2,3,3,4,4,5]
    let l1 = createSingleLinkedList(testArray)
    test_0082(l1)
}

/** 测试  */
function test(){
    let testArray = [1,1,1,2,3,5,6,6,8]
    let l1 = createSingleLinkedList(testArray)
    console.log(l1)
    console.log(singleLinkedListToArray(l1))
}