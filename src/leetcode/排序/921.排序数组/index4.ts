/** MergeSort RE */
function sortArray4(nums: number[]): number[] {
    mergeSort(nums,0,nums.length-1)
    return nums
}
function mergeSort(nums,left,right){
    if(left>=right) return;
    let mid = Math.floor(left+(right-left)/2)
    mergeSort(nums,left,mid)
    mergeSort(nums,mid+1,right)
    merge(nums,left,mid,right)
}

function merge(nums,left,mid,right){
    let newArr = []
    let lt = left
    let gt = mid+1
    while(lt<=mid && gt<=right){
        if(nums[lt]<nums[gt]){
            newArr.push(nums[lt]) 
            lt++
        }else{
            newArr.push(nums[gt]) 
            gt++
        }

    }
    while(lt<=mid){
        newArr.push(nums[lt]) 
        lt++
    }
    while(gt<=right){
        newArr.push(nums[gt]) 
        gt++
    }
    let i = left
    newArr.forEach(e=>{
     nums[i++] = e
    })
}

export function main(){
    sortArray4([5,2,3,1])
}