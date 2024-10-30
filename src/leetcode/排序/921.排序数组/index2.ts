/** quickSort RE success */
function sortArray2(nums: number[]): number[] {
    quickSort(nums, 0, nums.length - 1);
    return nums;

    function quickSort(nums, left, right) {
        if (left < right) {
            const { lt, gt } = partition(nums, left, right);
            quickSort(nums, left, lt - 1);
            quickSort(nums, gt + 1, right);
        }
    }

    function partition(nums, left, right) {
        const randomIndex = Math.floor(
            left + Math.random() * (right - left + 1)
        );
        [nums[randomIndex], nums[right]] = [nums[right], nums[randomIndex]];
        const pivot = nums[right];
        let i = left;
        let lt = left;
        let gt = right;
        while (i <= gt) {
            if (nums[i] < pivot) {
                [nums[i], nums[lt]] = [nums[lt], nums[i]];
                lt++;
                i++;
            } else if (nums[i] > pivot) {
                [nums[i], nums[gt]] = [nums[gt], nums[i]];
                gt--;
            } else i++;
        }

        return { lt, gt };
    }
}
