// 2025-09-04-LC-76-MinimumWindowSubstring.js

/**
 * Given two strings s and t of lengths m and n respectively, return the minimum window

of s such that every character in t (including duplicates) is included in the window. If there is no such substring, return the empty string "".

The testcases will be generated such that the answer is unique.

 

Example 1:

Input: s = "ADOBECODEBANC", t = "ABC"
Output: "BANC"
Explanation: The minimum window substring "BANC" includes 'A', 'B', and 'C' from string t.

Example 2:

Input: s = "a", t = "a"
Output: "a"
Explanation: The entire string s is the minimum window.

Example 3:

Input: s = "a", t = "aa"
Output: ""
Explanation: Both 'a's from t must be included in the window.
Since the largest window of s only has one 'a', return empty string.

 
 */

/*
    Input: s: string t: string
    Output: string
    Simplify: return shortest substring that all the char in t

    Constraints: 
    t can have duplicates

*/

/*
    Algo: Sliding Windows + Hash Map
    init start
    init min 
    for loop - init end 

*/

var minWindow = function(s, t){ // Input: s = "ADOBECODEBANC", t = "ABC"
    if (s.length === 0 || t.length === 0) return "" // guardrails for edgecase of empty string

    let tMap = new Map() // init map for t {A: 1, B:1, C:1}
    for (let char of t) {
        tMap.set(char, (tMap.get(char) || 0) + 1) // set equal to the frequency in t
    }

    let required = tMap.size // minimum length
    let formed = 0
    let windowCounts = new Map() 

    let l = 0; r = 0;
    let minLen = Infinity, minLeft = 0

    while (r < s.length) { // while right is less than s.length
        let char = s[r] // get char
        windowCounts.set(char, (windowCounts.get(char) || 0) + 1) // accounts for freqeuncy

        if (tMap.has(char) && windowCounts.get(char) === tMap.get(char)) { // if tMap has the char and the windowCount has the same value as tMap
            formed++ // increment formed
        }
        
        // Try to shrink window
        while (l <= r && formed === required) { // while l is less than right and formed is equal to required
            char = s[l] // char is equal to left index

            if (r - l + 1 < minLen) { // if r - 1 + 1 is less than minLen
                minLen = r - l + 1 // minLen = right - left + 1
                minLeft = l // minLeft = left
            }

            windowCounts.set(char, windowCounts.get(char) - 1); // minus one to the character in windowCount
            if (tMap.has(char) && windowCounts.get(char) < tMap.get(char)){ // if tMap.has(char) and windowGet.get(char) is less than t.Map.get(char)
                formed-- // decrement formed
            }
            l++ // increment l to prevent infinite loop
        }
        r++ // increment r to prevent infinity loop
    }
    return minLen === Infinity ? "" : s.slice(minLeft, minLeft + minLen) // return minLen

}
