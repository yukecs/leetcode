/** pass */
function search(nums: number[], target: number): number {
    let i = 0
    let j = nums.length-1
    while(i<=j){
        const m = Math.floor( i + ( j - i )/2 )
        if(nums[m]>target){
            j = m - 1
        }else if(nums[m]<target){
            i = m + 1
        }else {return m}
        
    }
    return -1
};
