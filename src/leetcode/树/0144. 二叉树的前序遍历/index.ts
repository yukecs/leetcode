/**
 * Definition for a binary tree node.
 * class TreeNode {
 *     val: number
 *     left: TreeNode | null
 *     right: TreeNode | null
 *     constructor(val?: number, left?: TreeNode | null, right?: TreeNode | null) {
 *         this.val = (val===undefined ? 0 : val)
 *         this.left = (left===undefined ? null : left)
 *         this.right = (right===undefined ? null : right)
 *     }
 * }
 */

import {TreeNode} from '../../type'

// //基于递归
// function preorderTraversal(root: TreeNode | null): number[] {
//     let list = []
//     traverse(root)
//     return list
//     function traverse(root: TreeNode | null){
//         if(root === null) return;
//         list.push(root.val)
//         traverse(root.left)
//         traverse(root.right)
//     }
// };

//基于迭代 mine
function preorderTraversal(root: TreeNode | null): number[] {
    if(!root) return [];
    let list = []
    let stack = []

    while(root || stack.length !== 0){
        list.push(root.val)
        if(root.right){
            stack.push(root.right)
        }
        if(root.left){
            root = root.left 
        }else{
            root = stack[stack.length - 1]
            stack.pop()
        }
    }

    return list
};