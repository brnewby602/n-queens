// This file is a Backbone Model (don't worry about what that means)
// It's part of the Board Visualizer
// The only portions you need to work on are the helper functions (below)

(function() {

  window.Board = Backbone.Model.extend({

    initialize: function(params) {
      if (_.isUndefined(params) || _.isNull(params)) {
        console.log('Good guess! But to use the Board() constructor, you must pass it an argument in one of the following formats:');
        console.log('\t1. An object. To create an empty board of size n:\n\t\t{n: %c<num>%c} - Where %c<num> %cis the dimension of the (empty) board you wish to instantiate\n\t\t%cEXAMPLE: var board = new Board({n:5})', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: grey;');
        console.log('\t2. An array of arrays (a matrix). To create a populated board of size n:\n\t\t[ [%c<val>%c,%c<val>%c,%c<val>%c...], [%c<val>%c,%c<val>%c,%c<val>%c...], [%c<val>%c,%c<val>%c,%c<val>%c...] ] - Where each %c<val>%c is whatever value you want at that location on the board\n\t\t%cEXAMPLE: var board = new Board([[1,0,0],[0,1,0],[0,0,1]])', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: grey;');
      } else if (params.hasOwnProperty('n')) {
        this.set(makeEmptyMatrix(this.get('n')));
      } else {
        this.set('n', params.length);
      }
    },

    rows: function() {
      return _(_.range(this.get('n'))).map(function(rowIndex) {
        return this.get(rowIndex);
      }, this);
    },

    togglePiece: function(rowIndex, colIndex) {
      this.get(rowIndex)[colIndex] = +!this.get(rowIndex)[colIndex];
      this.trigger('change');
    },

    _getFirstRowColumnIndexForMajorDiagonalOn: function(rowIndex, colIndex) {
      return colIndex - rowIndex;
    },

    _getFirstRowColumnIndexForMinorDiagonalOn: function(rowIndex, colIndex) {
      return colIndex + rowIndex;
    },

    hasAnyRooksConflicts: function() {
      return this.hasAnyRowConflicts() || this.hasAnyColConflicts();
    },

    hasAnyQueenConflictsOn: function(rowIndex, colIndex) {
      return (
        this.hasRowConflictAt(rowIndex) ||
        this.hasColConflictAt(colIndex) ||
        this.hasMajorDiagonalConflictAt(this._getFirstRowColumnIndexForMajorDiagonalOn(rowIndex, colIndex)) ||
        this.hasMinorDiagonalConflictAt(this._getFirstRowColumnIndexForMinorDiagonalOn(rowIndex, colIndex))
      );
    },

    hasAnyQueensConflicts: function() {
      return this.hasAnyRooksConflicts() || this.hasAnyMajorDiagonalConflicts() || this.hasAnyMinorDiagonalConflicts();
    },

    _isInBounds: function(rowIndex, colIndex) {
      return (
        0 <= rowIndex && rowIndex < this.get('n') &&
        0 <= colIndex && colIndex < this.get('n')
      );
    },


    /*
             _             _     _
         ___| |_ __ _ _ __| |_  | |__   ___ _ __ ___ _
        / __| __/ _` | '__| __| | '_ \ / _ \ '__/ _ (_)
        \__ \ || (_| | |  | |_  | | | |  __/ | |  __/_
        |___/\__\__,_|_|   \__| |_| |_|\___|_|  \___(_)

     */
    /*=========================================================================
    =                 TODO: fill in these Helper Functions                    =
    =========================================================================*/

    // ROWS - run from left to right
    // --------------------------------------------------------------
    //
    // test if a specific row on this board contains a conflict
    hasRowConflictAt: function(rowIndex) {
      var rowCols = this.get(rowIndex);
      var conflict = false;
      var count = 0;
      //iterate through row
      for (var i = 0; i < rowCols.length; i++) {
        if (rowCols[i] === 1 && (++count >= 2)) {
          conflict = true;
          break;
        }
      }
      return conflict;
    },

    // test if any rows on this board contain conflicts
    hasAnyRowConflicts: function() {

      // retrieve all of the rows
      var rows = this.rows();
      var conflict = false;
      //iterate over rows and call hasRowConflictAt
      for (var i = 0; i < rows.length; i++) {
        for (var j = 0; j < rows[i].length; j++) {
          if (this.hasRowConflictAt(j)) {
            conflict = true;
            break;
          }
        }
      }

      return conflict;
    },



    // COLUMNS - run from top to bottom
    // --------------------------------------------------------------
    //
    // test if a specific column on this board contains a conflict
    hasColConflictAt: function(colIndex) {
      var rows = this.rows();
      var conflict = false;
      var count = 0;

      for (var i = 0; i < rows.length; i++) {
        if (rows[i][colIndex] === 1 && (++count >= 2)) {
          conflict = true;
          break;
        }
      }
      return conflict;
    },

    // test if any columns on this board contain conflicts
    hasAnyColConflicts: function() {
      console.log('THIS.GET', this.get(0));
      
      var row = this.get(0);

      var numberOfCols = row ? row.length : 0;
      var conflict = false;
      for (var i = 0; i < numberOfCols; i++) {
        if (this.hasColConflictAt(i)) {
          conflict = true;
          break;
        }
      }
      return conflict;
    },



    // Major Diagonals - go from top-left to bottom-right
    // --------------------------------------------------------------
    //
    // test if a specific major diagonal on this board contains a conflict
    hasMajorDiagonalConflictAt: function(majorDiagonalColumnIndexAtFirstRow) {
      // retrieve rows
      var rows = this.rows();
      var conflict = false;
      var count = 0;
      // iterate over rows 
      for (var i = 0; i < rows.length; i++) {
        // retrieve value starting at majorDiagonalColumnIndexAtFirstRow
        if (rows[i][majorDiagonalColumnIndexAtFirstRow + i] && (++count >= 2)) {
          conflict = true;
          break;
        }
      }

      return conflict;
    },

    // test if any major diagonals on this board contain conflicts
    hasAnyMajorDiagonalConflicts: function() {
      // retrieve rows
      var row = this.get(0);
      var length = row ? row.length : 0;
      
    
      var startColIndex = length - (length + (length - 2));
      // var count = 0;
      var conflict = false;
      // iterate over rows
      for (var i = startColIndex; i < length; i++) {
        // each row, call hasMajorDiagonalConflictAt 
        // if it returns true
        // there is a conflict, return false
        if (this.hasMajorDiagonalConflictAt(i)) {
          conflict = true;
          break;
        }
      }
      return conflict;
    },



    // Minor Diagonals - go from top-right to bottom-left
    // --------------------------------------------------------------
    //
    // test if a specific minor diagonal on this board contains a conflict
    hasMinorDiagonalConflictAt: function(minorDiagonalColumnIndexAtFirstRow) {
      var rows = this.rows();
      var conflict = false;
      var count = 0;
      for (var i = 0; i < rows.length; i++) {
        if (rows[i][minorDiagonalColumnIndexAtFirstRow - i] && (++count >= 2)) {
          conflict = true;
          break;
        }
      }

      return conflict;
    },

    // test if any minor diagonals on this board contain conflicts
    hasAnyMinorDiagonalConflicts: function() {
      var row = this.get(0);
      var length = row ? row.length : 0;
      var startColIndex = length + (length - 
        3);
      var conflict = false;

      for (var i = startColIndex; i > 0; i--) {
        if (this.hasMinorDiagonalConflictAt(i)) {
          conflict = true;
          break;
        }
      }
      return conflict;
    },

    testSolution: function(initialRowIndex, initialColIndex, pieceType) {
      var count = 1;  
      var rows = this.rows();
      var length = rows.length;

      for (var i = 0; i < length; i++) {
        for (var j = 0; j < length; j++) {
          if ( i === initialRowIndex && j === initialColIndex) {
            continue;
          }
          this.togglePiece(i, j);
          
          // call right conflicts function based on type
          
          if ( (pieceType === 'queen' && this.hasAnyQueensConflicts()) || (pieceType === 'rook' && this.hasAnyRooksConflicts())) {
            this.togglePiece(i, j); 
          } else {
            count++;
            if (count === length) {
              return this.rows();
            }
          }
        }
        // no solution has been found
      }
    },

    boundarySolution: function(rows, length) {
      if (length === 1) {
        this.togglePiece(0, 0);
        return rows;
      } else {
        return rows;
      }
    } 


    /*--------------------  End of Helper Functions  ---------------------*/


  });

  var makeEmptyMatrix = function(n) {
    return _(_.range(n)).map(function() {
      return _(_.range(n)).map(function() {
        return 0;
      });
    });
  };

}());
