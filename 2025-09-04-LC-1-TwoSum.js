// 2025-09-04-LC-1-TwoSum.js

/*
Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target.

You may assume that each input would have exactly one solution, and you may not use the same element twice.

You can return the answer in any order.

 

Example 1:

Input: nums = [2,7,11,15], target = 9
Output: [0,1]
Explanation: Because nums[0] + nums[1] == 9, we return [0, 1].

Example 2:

Input: nums = [3,2,4], target = 6
Output: [1,2]

Example 3:

Input: nums = [3,3], target = 6
Output: [0,1]

 

Constraints:

    2 <= nums.length <= 104
    -109 <= nums[i] <= 109
    -109 <= target <= 109
    Only one valid answer exists.

 
Follow-up: Can you come up with an algorithm that is less than O(n2) time complexity?
 
*/

// Input: nums: array of ints | target: int
// Output: array of ints
// Simplify: Return two indices where the elements add up to the target

// edgecases/assumptions:
// array is empty
// no duplicates

// Brute Force Algo
/*
    for loop over nums starting at 0 index
        for loop over nums starting at index + 1 
            if there is a match
                return index, index
 */
var twoSum = function(nums, target) {
    for (let i = 0; i < nums.length; i++){
        for (let j = i+1; j < nums.length; j++){
            if (nums[i] + nums[j] === target){
                return [i, j]
            }
        }
    }
}

// Optimized Algo
/*
    init map (or obj)
    for loop over nums.length
        let complement = target - nums[i] - important that target is first
        if the complement is in map
            return the indexes
        add to obj the key value 

*/

var twoSum = function(nums, target){
    let map = new Map()
    for (let i = 0; i < nums.length; i++){
        let complement = target - nums[i]
        if (map.has(complement)){
            return [map.get(complement), i]
        }
        map.set(nums[i], i)
    }
}