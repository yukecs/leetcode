import {ListNode} from '../type'
/**
 * 通过数组创建单链表
 */
export function createSingleLinkedList(vals:number[]):ListNode{
    let head = new ListNode(-1)
    let prehead = head
    vals.forEach((val,i)=>{
        prehead.val = val
        prehead = prehead.next
    })
    return head
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

    let testArray = [1,1,1,2,3,5,6,6,8]
    console.log(singleLinkedListToArray(createSingleLinkedList(testArray)))
}

main()