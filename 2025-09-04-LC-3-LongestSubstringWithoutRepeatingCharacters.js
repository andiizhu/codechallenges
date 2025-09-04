// 2025-09-04-LC-3-LongestSubstringWithoutRepeatingCharacters.js

/**
 * 3. Longest Substring Without Repeating Characters
Solved
Medium
Topics
premium lock iconCompanies
Hint

Given a string s, find the length of the longest

without duplicate characters.

 

Example 1:

Input: s = "abcabcbb"
Output: 3
Explanation: The answer is "abc", with the length of 3.

Example 2:

Input: s = "bbbbb"
Output: 1
Explanation: The answer is "b", with the length of 1.

Example 3:

Input: s = "pwwkew"
Output: 3
Explanation: The answer is "wke", with the length of 3.
Notice that the answer must be a substring, "pwke" is a subsequence and not a substring.

 

Constraints:

    0 <= s.length <= 5 * 104
    s consists of English letters, digits, symbols and spaces.

 * 
 */

/*
    Input: stirng
    Ouptut: int
    Simplify: return longest string without repeating characters

*/

// Optimized

var lengthOfLongestSubstring = function(s){
    let map = new Map() // init new Map
    let maxLength = 0;  // init maxLength
    let start = 0 // init start

    for (let end = 0; end < s.length; end++){ // for loop over s, end is second pointer
        let char = s[end] // get the letter at current index
        if (map.has(char) && map.get(char) >= start){ // if the map has the letter and if the value is greater than start
            start = map.get(char) + 1 // start = value of letter + 1
        }
        map.set(char, end) // set the key as the letter and the value as end 
        maxLength = Math.max(maxLength, end - start + 1) // maxLength is higher of the currentLength and end - start + 1 (because of 0-index)
    }
}

