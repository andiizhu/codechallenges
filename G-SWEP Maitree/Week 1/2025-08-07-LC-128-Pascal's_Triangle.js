// 2025-08-07-LC-128-Pascal's_Triangle.js 


// Given an integer numRows, return the first numRows of Pascal's triangle.
// In Pascal's triangle, each number is the sum of the two numbers directly above it as shown:

 
// Example 1:
// Input: numRows = 5
// Output: [[1],[1,1],[1,2,1],[1,3,3,1],[1,4,6,4,1]]

// Example 2:
// Input: numRows = 1
// Output: [[1]]

 
// Constraints:
// 1 <= numRows <= 30

// Input: numRows - integer, amount of rows that we need to produce for our output
// Pascal Triangle always starts out with one.

// Brute force:
// numRows equal 1 = [[1]]
// numRows equal 2 = [[1], [1,1]]
// Hardcode
// Result array = [hardcoded]	
// Loop over last element in result, x - 2 (harcoding) [1,2,1]
// Building array to push to result array
// Loop over the element array starting at 0
// If it’s is 0, push value
// else index equal to length element array, push value
// else index >= 1, push value + value of previous index
// Push to result array

// Resultarray = [[1], [1,1]]

// numOfRows = 4
// I = 0, stopping condition = numOfRws -2; i++{
// Temp = [1, ]
// 	J = 1; stopping condition = resultArray[i].length; j++
// 	If J = [0], temp.push(resultArray[i][j])
	
		


// Time complexity: O(n^2)
// Space complexity: O(n)


// -equal row gains additional element
// - 

// [1]
// [1, 1]
// Row = [1,2,1]
// [1,3,3,1]

// [first, first + next, last] if last, no sum

// First = 0
// [row[0], row[0] + row[1], row[1] + row[2], row[2]]

// [row[i], row[i] + row[j], row[i] + row[j], row[j]]

// Solution 1: Brute force
var generate = function(numRows) {
    if (numRows === 0) return []
    if (numRows === 1) return [[1]]
    if (numRows === 2) return [[1], [1,1]]

    let result = [[1], [1,1]]
    for (let i = 2; i < numRows; i++){
        let temp = [1]
        let prev = result[i - 1]
        for (let j = 1; j < prev.length; j++){
            temp.push(prev[j-1] + prev[j])
        }
        temp.push(1)
        result.push(temp)
    }
    
    return result
}

// More Simple Algorithm
/**
 * Start with an empty result array.

Loop numRows times.

Initialize each row starting with 1.

For each row after the first, fill in middle values by adding the two numbers from the row above.

End each row with 1 if it’s longer than 1.
 */

// Solution 2: Simplified Solution, same time and space complexity:
var generate = function(numRows) {
    result = []

    for (let i = 0; i < numRows; i++){
        let row = [1]
        for (let j = 1; j < i; j++) {
            let last = result[i-1]
            row.push(last[j-1] + last[j])
        }
        if (i > 0) row.push(1)
        result.push(row)
    }
    return result
};

// Time Complexity: O(n^2) -   
// Space Complexity: O(n^2) - we’re storing the entire triangle in an array

// Solution 3: Dynamic Programming
// var generate = function(numRows) {
//     let result = []

//     for (let i = 0; i < numRows; i++){
//         let row = new Array(i+1).fill(1)
//         for (let j = 1; j < i; j++) {
//             row[j] = result[i-1][j-1] + result[i-1][j]
//         }
//         result.push(row)
//     }
//     return result
// };