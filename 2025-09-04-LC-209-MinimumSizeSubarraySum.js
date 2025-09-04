// 2025-09-04-LC-209-MinimumSizeSubarraySum.js
/*
Given an array of positive integers nums and a positive integer target, return the minimal length of a

whose sum is greater than or equal to target. If there is no such subarray, return 0 instead.

 

Example 1:

Input: target = 7, nums = [2,3,1,2,4,3]
Output: 2
Explanation: The subarray [4,3] has the minimal length under the problem constraint.

Example 2:

Input: target = 4, nums = [1,4,4]
Output: 1

Example 3:

Input: target = 11, nums = [1,1,1,1,1,1,1,1]
Output: 0

 

Constraints:

    1 <= target <= 109
    1 <= nums.length <= 105
    1 <= nums[i] <= 104
 */

// Input: target: int | nums = array of ints
// Output: int
// Simplify: return the minimum length where sum of subarray is greater than target


/**
 * Brute force:
 * init shortest
 * init value
 * init start
 * for loop over array - init end 
 *      add the element to value 
 * 
 *      while value >= target
 *          calc minLength
 *          subtract start element
 *          increment start
 *  
 * 
 */

var minSubArrayLen = function(target, nums) {
    let min = Infinity
    let value = 0
    let start = 0

    for (let end = 0; end < nums.length; end++){
        value += nums[end]

        while (value >= target){
            min = Math.min(min, end - start + 1)
            value -= nums[start]
            start++
        }
    }
    return min === Infinity ? 0 : min
};
