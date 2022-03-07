/**
 * Definition for Node.
 * class Node {
 *     val: number
 *     next: Node | null
 *     random: Node | null
 *     constructor(val?: number, next?: Node, random?: Node) {
 *         this.val = (val===undefined ? 0 : val)
 *         this.next = (next===undefined ? null : next)
 *         this.random = (random===undefined ? null : random)
 *     }
 * }
 */

import { Node } from './type'

/**迭代 first success */

export function copyRandomList(l1: Node | null): Node | null {
    if(!l1) return l1;
    var nodeMap = new Map<Node,Node>()
    var prehead1 = l1
    var l2:Node | null =new Node(l1.val)
    nodeMap.set(l1,l2)
    var prehead2 = l2
    while(prehead1){
        if(prehead1.next){
            if(nodeMap.has(prehead1.next)){
                prehead2.next = nodeMap.get(prehead1.next)
            }else{
                prehead2.next = new Node(prehead1.next.val)
                nodeMap.set(prehead1.next,prehead2.next)
            }
        }
        if(prehead1.random){
            if(nodeMap.has(prehead1.random)){
                prehead2.random = nodeMap.get(prehead1.random)
            }else{
                prehead2.random = new Node(prehead1.random.val)
                nodeMap.set(prehead1.random,prehead2.random)
            }
        }
        prehead1 = prehead1.next
        prehead2 = prehead2.next
    }
    return l2 
};