// 2025-08-07-LC-36-ValidSudoku.js
/*
Determine if a 9 x 9 Sudoku board is valid. Only the filled cells need to be validated according to the following rules:
Each row must contain the digits 1-9 without repetition.
Each column must contain the digits 1-9 without repetition.
Each of the nine 3 x 3 sub-boxes of the grid must contain the digits 1-9 without repetition.
Note:
A Sudoku board (partially filled) could be valid but is not necessarily solvable.
Only the filled cells need to be validated according to the mentioned rules.
 
Example 1:

Input: board = 
[["5","3",".",".","7",".",".",".","."]
,["6",".",".","1","9","5",".",".","."]
,[".","9","8",".",".",".",".","6","."]
,["8",".",".",".","6",".",".",".","3"]
,["4",".",".","8",".","3",".",".","1"]
,["7",".",".",".","2",".",".",".","6"]
,[".","6",".",".",".",".","2","8","."]
,[".",".",".","4","1","9",".",".","5"]
,[".",".",".",".","8",".",".","7","9"]]
Output: true

Example 2:
Input: board = 
[["8","3",".",".","7",".",".",".","."]
,["6",".",".","1","9","5",".",".","."]
,[".","9","8",".",".",".",".","6","."]
,["8",".",".",".","6",".",".",".","3"]
,["4",".",".","8",".","3",".",".","1"]
,["7",".",".",".","2",".",".",".","6"]
,[".","6",".",".",".",".","2","8","."]
,[".",".",".","4","1","9",".",".","5"]
,[".",".",".",".","8",".",".","7","9"]]
Output: false
Explanation: Same as Example 1, except with the 5 in the top left corner being modified to 8. Since there are two 8's in the top left 3x3 sub-box, it is invalid.

 
Constraints:
board.length == 9
board[i].length == 9
board[i][j] is a digit 1-9 or '.'.
Input: adjacency list, matrix 

Brute force: 
Every value, check row and see if there a duplicate
Every value, check column and see if there’s a duplicate
Every subox, check to see if ther’s a duplicate

Rows: {0: new Set(), }
Columns:


Loop board rows [i]
	
Loop board columns [j]
	If board[i][j] != blank
		Visited Set()
		Call checkRows
		Call checkColumns
		Call subbox
Return true

Time Complexity: O(n^2 * m^2) n = 9- board, m= 3-board
Space Complexity: O(n)




Function checkRows, whether there is the same value in the row
	Return false

Function checkColumns whether there is the same value in column
	Return false

Function subbox
	For loop overage the list, ignore value
	Return false

List = [ 1: rows: [0,2], column [0,2],
	2: rows [0,2], column: [3,5],
	3: rows [0,2], column: [6,8],
	4: rows [3,5], column” [0,2]


Minimum Time Complexity: 0(n^2)


[ 1, 2, 4, , 6, , , 9, ,]

[ 1, 2, 4, , 6, , , 1, ,]


// make multiple values for row
// make multiple values for columns
// off i, j for each subbox
// keep count of values in the map
// count, if count is 2, it’s false

 */


// Brute Force: T: O(n^2 * m^2) S: O(1)
var isValidSudoku = function(board){
    for (let i = 0; i < board.length; i++ ){
        for (let j = 0; j < board[i].length; j++){
            const val = board[i][j]
            if (val === ".") continue

            if (!checkRows(board, i, j, val)) return false
            if (!checkColumns(board, i, j, val)) return false
            if (!checkSubBox(board, i, j, val)) return false
        }
    }
    return true
};

const checkRows = (board, row, col, val) => {
    for (let j = 0; j < 9; j++){
        if (j !== col && board[row][j] === val) {
            return false
        }
    }
    return true
}

const checkColumns = (board, row, col, val) => {
    for (let i = 0; i < 9; i++){
        if (i !== row && board[i][col] == val){
            return false
        }
    }
    return true
}

const checkSubBox = (board, row, col, val) => {
    const boxRowStart = Math.floor(row/3) * 3
    const boxColStart = Math.floor(col/3) * 3

    for (let i = boxRowStart; i < boxRowStart + 3; i++){
        for (let j = boxColStart; j < boxColStart + 3; j++){
            if ((i !== row || j !== col) && board[i][j] == val) {
                return false
            }
        }
    }
    return true
}


// Function isValidSudoku(board):
//     Initialize rows as an array of 9 empty sets
//     Initialize cols as an array of 9 empty sets
//     Initialize boxes as an array of 9 empty sets

//     For i from 0 to 8:
//         For j from 0 to 8:
//             val = board[i][j]

//             If val is ".":
//                 Continue

//             If val is in rows[i]:
//                 Return false

//             If val is in cols[j]:
//                 Return false

//             boxIndex = (i // 3) * 3 + (j // 3)
//             If val is in boxes[boxIndex]:
//                 Return false

//             Add val to rows[i]
//             Add val to cols[j]
//             Add val to boxes[boxIndex]

//     Return true


// Optimized : T: O(n^3) S: (On^2)
const isValidSudoku = (board) => {
    let rows = [...Array(9)].map(() => new Set())
    let cols = [...Array(9)].map(() => new Set())
    let boxes = [...Array(9)].map(() => new Set())

    for (let i = 0; i < 9; i++){
        for (let j = 0; j < 9; j++){
            const val = board[i][j]

            if (val === ".") continue

            const boxIndex = Math.floor(i/3) * 3 + Math.floor(j/3)

            if (rows[i].has(val) || cols[j].has(val) || boxes[boxIndex].has(val)){
                return false 
            }

            rows[i].add(val)
            cols[j].add(val)
            boxes[boxIndex].add(val)
        }
    }
    return true
}