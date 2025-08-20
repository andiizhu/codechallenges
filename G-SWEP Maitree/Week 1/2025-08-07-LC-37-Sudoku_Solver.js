// 2025-08-07-LC-37-Sudoku_Solver.js

/**
 * Problem: 
 * Input - board: array of array of strings
 * Output - board: array of array of strings - fill out the board
 * Simplify - fill in the empty cells in the sudoku
 * 
 * rules: normal sudoku rules
 */

// We need to know what each row, column, and subBox contain to understanding what is missing 
//      This is to know what we have 
// Create another group(map? set?) to store all valid numbers in each cell. 
//      If there's only one option, you should update the board and update data
//      If it's the only valid number in the row, column, or subbox, also update the board update
//      What to do if there's only multiple options?
//          If there are groupings that contains the same information,  such as 
//          (1,5), (1,5), (5,9),(7,9), (5,7,8,9), we can remove (1,5) from all cells expect where (1,5) is the sole option
//          Not sure how to do deductions, when it's like (1,3), (3,5), (1,5)
//      Guess (backtrack)?

// Pseudocode:
// Initalize rowSets,colSets, boxSets // track existing values in board
// Initalize cells Map //store valid digits for each empty cell

// while loop until there is no more empty cells?

    // for each empty cell -- FIlling in map to know what's missing
        // update valid options by checking row/column/box
        // if only one option:
            // fill cell
            // update rowSets/colSets/boxSets
            // remove cell from cells Map

    // for each group (row, col, box) -- Check for only valid option in cell, like only one 9 in subbox
        // fill cell
            // update rowSets/colSets/boxSets
            // remove cell from cells Map
    
    // for each group (row, col, box) -- check for pairs/triplets, only options
        // not sure how to do logic here, but if found, eliminate values in shared group

    // if not more logical deductions, backtrack(?) and guess, picking smallest cell and choose an option


var solveSudoku = (board) => {
    const rows = Array.from({ length: 9 }, () => new Set());
    const cols = Array.from({ length: 9 }, () => new Set());
    const boxes = Array.from({ length: 9 }, () => new Set());
    const empty = [];

    const getBoxIdx = (r, c) => Math.floor(r / 3) * 3 + Math.floor(c / 3);

    // Populate sets and track empty cells
    for (let r = 0; r < 9; r++) {
        for (let c = 0; c < 9; c++) {
            const val = board[r][c];
            if (val === '.') {
                empty.push([r, c]);
            } else {
                rows[r].add(val);
                cols[c].add(val);
                boxes[getBoxIdx(r, c)].add(val);
            }
        }
    }

    // Try logic-based filling: naked singles
    const fillEasy = () => {
        let changed = false; // flag to know if we made a change needed for while loop
        for (let i = empty.length - 1; i >= 0; i--) { // loop through empty cells
            const [r, c] = empty[i]; // get row and column
            const candidates = []; // store valid candidates
            for (let num = 1; num <= 9; num++) { // loop through numbers 1-9
                const str = num.toString(); // convert number to string
                if ( // check if number is valid
                    !rows[r].has(str) &&
                    !cols[c].has(str) &&
                    !boxes[getBoxIdx(r, c)].has(str)
                ) { // check if number is valid
                    candidates.push(str); // add to candidate 
                }
            }

            if (candidates.length === 1) { // if only one candidate
                const val = candidates[0]; // get candidate
                board[r][c] = val; // fill cell
                rows[r].add(val); // update row
                cols[c].add(val); // update column
                boxes[getBoxIdx(r, c)].add(val); // update box
                empty.splice(i, 1); // remove cell from empty cells - O(n)
                changed = true; // flag change
            }
        }
        return changed;
    };

    // Repeat logic fill until no more progress
    while (fillEasy());

    // Backtracking for remaining cells
    const solve = (idx) => { // idx is the index of the empty cell
        if (idx === empty.length) return true; // if no more empty cells, return true
        const [r, c] = empty[idx]; // get row and column

        for (let num = 1; num <= 9; num++) { // loop through numbers 1-9
            const str = num.toString(); // convert number to string
            const boxIdx = getBoxIdx(r, c); // get box index
            if (
                !rows[r].has(str) &&
                !cols[c].has(str) &&
                !boxes[boxIdx].has(str)
            ) { // check if number is valid
                board[r][c] = str; // fill cell
                rows[r].add(str); // update row
                cols[c].add(str); // update column
                boxes[boxIdx].add(str); // update box

                if (solve(idx + 1)) return true; // if solution found, return true

                board[r][c] = '.'; // undo changes
                rows[r].delete(str); // undo changes
                cols[c].delete(str); // undo changes
                boxes[boxIdx].delete(str); // undo changes
            }
        }

        return false; // if no solution found, return false 
    };

    solve(0); // start backtracking
    return board;
};


// Optimized Solution - Bitmasking and Backtracking and MRV (no idea what this means)
var solveSudoku = (board) => {
  // Masks for rows, cols, boxes: bit i set means digit (i+1) is taken
  const rows = new Array(9).fill(0); // track existing values in row    
  const cols = new Array(9).fill(0); // track existing values in column
  const boxes = new Array(9).fill(0); // track existing values in box

  // List of empty cells [row, col]
  const empty = []; 

  // Convert digit char to bitmask position
  const digitToBit = (d) => 1 << (d - 1); 

  // Get box index
  const getBoxIndex = (r, c) => Math.floor(r / 3) * 3 + Math.floor(c / 3);

  // Initialize masks and empty cells
  for (let r = 0; r < 9; r++) {
    for (let c = 0; c < 9; c++) {
      const val = board[r][c];
      if (val === '.') {
        empty.push([r, c]);
      } else {
        const bit = digitToBit(+val);
        rows[r] |= bit;
        cols[c] |= bit;
        boxes[getBoxIndex(r, c)] |= bit;
      }
    }
  }

  // Count how many bits are set (number of candidates)
  const bitCount = (mask) => {
    let count = 0;
    while (mask) {
      mask &= (mask - 1);
      count++;
    }
    return count;
  };

  // Get candidates bitmask for a cell
  const candidates = (r, c) => {
    const boxIdx = getBoxIndex(r, c);
    // Bits set mean digits used, invert to get candidates, mask only 9 bits
    return ~(rows[r] | cols[c] | boxes[boxIdx]) & 0x1ff;
  };

  // Convert bitmask to array of digits
  const bitsToDigits = (mask) => {
    const digits = [];
    for (let i = 0; i < 9; i++) {
      if ((mask & (1 << i)) !== 0) digits.push(i + 1);
    }
    return digits;
  };

  // Backtracking with MRV
  const backtrack = () => {
    if (empty.length === 0) return true;

    // Find cell with minimum candidates (MRV)
    let minOptions = 10,
      minIndex = -1,
      minMask = 0;

    for (let i = 0; i < empty.length; i++) {
      const [r, c] = empty[i];
      const mask = candidates(r, c);
      const count = bitCount(mask);
      if (count < minOptions) {
        minOptions = count;
        minIndex = i;
        minMask = mask;
        if (count === 1) break; // best case
      }
      if (count === 0) return false; // no candidates, prune early
    }

    if (minIndex === -1) return false;

    const [r, c] = empty[minIndex];
    empty.splice(minIndex, 1); // Remove chosen cell

    // Try each candidate digit
    for (const d of bitsToDigits(minMask)) {
      const bit = digitToBit(d);
      board[r][c] = d.toString();
      rows[r] |= bit;
      cols[c] |= bit;
      boxes[getBoxIndex(r, c)] |= bit;

      if (backtrack()) return true;

      // Undo changes
      board[r][c] = '.';
      rows[r] &= ~bit;
      cols[c] &= ~bit;
      boxes[getBoxIndex(r, c)] &= ~bit;
    }

    empty.splice(minIndex, 0, [r, c]); // Put cell back if no candidate worked
    return false;
  };

  backtrack();
};

// Solution with backtracking, no logical deductions
var solveSudoku = function(board) {
    let rowSet = [...Array(9)].map(() => new Set()) // create a new Set() to store existing values in row
    let colSet = [...Array(9)].map(() => new Set()) // create a new Set() to store existing values in column
    let boxSet = [...Array(9)].map(() => new Set()) // create a new Set() to store existing values in box
    let empty = [] // create an array to store empty cells

    const getBoxIndex = (r, c) => Math.floor(r/3) * 3 + Math.floor(c/3) // get box index
    
    for (let r = 0; r < 9; r++){ // loop over rows
        for (let c = 0; c < 9; c++){ // loop over columns
            const val = board[r][c]; // get value
            if (val === "."){
                empty.push([r, c]) // add empty cell to empty array
            } else {
                rowSet[r].add(val) // add value to rowSet
                colSet[c].add(val) // add value to colSet
                boxSet[getBoxIndex(r,c)].add(val) // add value to boxSet
            }
        }
    }

    const backtrack = (i) => { // backtrack function
        if (i === empty.length) return true // if all empty cells are filled, return true

        const [r, c] = empty[i] // get empty cell
        const boxIdx = getBoxIndex(r,c) // get box index

        for (let d = 1; d <= 9; d++){ // loop over digits - tries every number
            const ch = d.toString(); // convert digit to string 

            if ( // checks validity of digit
                !rowSet[r].has(ch) && // check if digit is not in row
                !colSet[c].has(ch) && // check if digit is not in column
                !boxSet[boxIdx].has(ch) // check if digit is not in box
            ) {
                // Place digit  
                board[r][c] = ch;
                rowSet[r].add(ch) // add value to rowSet
                colSet[c].add(ch) // add value to colSet
                boxSet[boxIdx].add(ch) // add value to boxSet

                if (backtrack(i+1)) return true // if backtrack returns true, try to solve next empty cell

                // Undo if it leads to dead end
                board[r][c] = "."; // remove value from board
                rowSet[r].delete(ch) // remove value from rowSet
                colSet[c].delete(ch) // remove value from colSet
                boxSet[boxIdx].delete(ch) // remove value from boxSet
            }
        }
        return false // if no valid digit is found, return false
    }

    backtrack(0) // start backtracking at first empty cell, is 0 because array index starts at 0
};