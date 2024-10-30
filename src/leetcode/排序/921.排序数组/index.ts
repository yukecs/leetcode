/** pass */
function sortArray(nums: number[]): number[] {
    quickSort(nums, 0, nums.length - 1);
    return nums;

    function quickSort(nums: number[], left: number, right: number): void {
        if (left < right) {
            const { lt, gt } = partition(nums, left, right);
            quickSort(nums, left, lt - 1);
            quickSort(nums, gt + 1, right);
        }
    }
    
    function partition(nums: number[], left: number, right: number): { lt: number, gt: number } {
        const randomIndex = Math.floor(Math.random() * (right - left + 1) + left);
        [nums[randomIndex], nums[right]] = [nums[right], nums[randomIndex]];
    
        const pivot = nums[right];
        let lt = left; // lt 指向小于 pivot 的区域
        let i = left; // i 用于遍历数组
        let gt = right; // gt 指向大于 pivot 的区域
    
        while (i <= gt) {
            if (nums[i] < pivot) {
                // 当前元素小于基准，将其交换到小于区域[left, lt-1]，并扩大小于区域
                [nums[i], nums[lt]] = [nums[lt], nums[i]];
                lt++;
                i++;
            } else if (nums[i] > pivot) {
                // 当前元素大于基准，将其交换到大于区域[gt+1, right]，并缩小大于区域
                [nums[i], nums[gt]] = [nums[gt], nums[i]];
                gt--;
            } else {
                // 当前元素等于基准[lt, gt]，保持不变，继续遍历
                i++;
            }
        }
    
        return { lt, gt };
    }
}

