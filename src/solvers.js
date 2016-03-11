/*           _
   ___  ___ | |_   _____ _ __ ___
  / __|/ _ \| \ \ / / _ \ '__/ __|
  \__ \ (_) | |\ V /  __/ |  \__ \
  |___/\___/|_| \_/ \___|_|  |___/

*/

// hint: you'll need to do a full-search of all possible arrangements of pieces!
// (There are also optimizations that will allow you to skip a lot of the dead search space)
// take a look at solversSpec.js to see what the tests are expecting


// return a matrix (an array of arrays) representing a single nxn chessboard, with n rooks placed such that none of them can attack each other

window.findNRooksSolution = function(n) {
  var board = new Board({n: n});
  var rows = board.rows();
  var length = rows.length;
  if (length === 1) {
    board.togglePiece(0, 0);
    return rows;
  }
  // loop to create initial placement
  for (var i = 0; i < length; i++) {
    for (var j = 0; j < length; j++) {
      // toggle that cell to be initial placement
      board.togglePiece(i, j);
      var currentTest = board.testSolution(i, j, 'rook');
      // if call test solution function is not undefined
      if (currentTest !== undefined) {
          // return solution
        return currentTest;
      } else {
        // clear board
        board = new Board({n: n});
      }
    }
  }  
};

// return the number of nxn chessboards that exist, with n rooks placed such that none of them can attack each other
window.countNRooksSolutions = function(n) {
  var solutionCount = undefined; //fixme

  console.log('Number of solutions for ' + n + ' rooks:', solutionCount);
  return solutionCount;
};

// return a matrix (an array of arrays) representing a single nxn chessboard, with n queens placed such that none of them can attack each other
window.findNQueensSolution = function(n) {

  var board = new Board({n: n});
  var rows = board.rows();
  var length = rows.length;

  if (length < 4) {
    return board.boundarySolution(rows, length);
  }
  
  // loop to create initial placement
  for (var i = 0; i < length; i++) {
    for (var j = 0; j < length; j++) {
      // toggle that cell to be initial placement
      board.togglePiece(i, j);
      var currentTest = board.testSolution(i, j, 'queen');
      // if call test solution function is not undefined
      if (currentTest !== undefined) {
          // return solution
        return currentTest;
      } else {
        // clear board
        board = new Board({n: n});
      }
    }
  }  
};

// return the number of nxn chessboards that exist, with n queens placed such that none of them can attack each other
window.countNQueensSolutions = function(n) {
  var solutionCount = undefined; //fixme

  console.log('Number of solutions for ' + n + ' queens:', solutionCount);
  return solutionCount;
};
