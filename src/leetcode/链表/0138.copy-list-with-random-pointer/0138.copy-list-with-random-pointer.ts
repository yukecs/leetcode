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

export function copyRandomList(l1: Node | null): Node | null {
    if(!l1) return l1;
    var nodeMap = new Map<Node,Node>()
    var prehead1 = l1
    var l2:Node | null =new Node(l1.val)
    nodeMap.set(l1,l2)
    var prehead2 = l2

    while(prehead1){

    }
};