/**
 * Module
 * Partitions of a rectangular screen into a grid.
 * Each part of the grid can hold elements in it.
 */

function Partitions(width, height, rows, columns) {

    // Todo: Validate arguments.

    // Todo: make sure that the dimension of the partitions are
    // integers and at the same time all partitions have the same size
    let partitionWidth = width / rows;
    let partitionHeight = height / columns;
    let partitions = generatePartitions(rows, columns);

    /**
     * Adds an element to the partition corresponding to the 
     * coordinates (x, y).
     */
    this.add = function(x, y, element) {
        let partition = getPartitionFromCoordinates(x, y);
        partition.add(element);
    };

    /**
     * Removes an element to the partition corresponding to the 
     * coordinates (x, y).
     */
    this.remove = function(x, y, element) {
        let partition = getPartitionFromCoordinates(x, y);
        partition.remove(element);
    }

    /**
     * Returns the elements in the partition that cointains
     * the point at the coordinates (x,y).
     */
    this.getElementsInPartition = function(x, y) {        
        let partition = getPartitionFromCoordinates(x, y);
        // Return a copy of the partition, not a reference to the original
        return new Set(partition);
    }

    /**
     * Returns all elements in the partition containing the point (x, y)
     * and the partitions around it.
     */
    this.getElementsInAdjacentParitions = function(x, y, adjacent) {
        let row = Math.floor(x / partitionWidth);
        let column = Math.floor(x / partitionHeight);

        let elements = new Set();

        for (let i = row - 1; i < row + 1; ++i) {
            
            // If the current row is at the top or at the bottom it doesn't
            // have neightbours  at the top or the bottom respectively. 
            if (i < 0 || i >= rows) continue;

            for (let j = column - 1; j < column + 1; ++j) {

                // If the current column is at the leftmost or rightmost it doesn't
                // have neightbours at its left or at its right respectively. 
                if (j < 0 || j >= columns) continue;

                elements = union(elements, partitions[i][j]);    
            }
        }

        return elements;
    }

    /**
     * Returns the partition containing the coordinates (x, y).
     * @param {integer} x 
     * @param {integer} y 
     */
    function getPartitionFromCoordinates(x, y) {
        let row = Math.floor(x / partitionWidth);
        let column = Math.floor(x / partitionHeight);
        return partitions[row][column];
    }

    /**
     * Returns a row x columns matrix. Each entry contains a set.
     * @param {integer} rows 
     * @param {integer} columns 
     */
    function generatePartitions(rows, columns) {
        let partitions = [];
        for (let row = 0; row < rows; ++row) {
            partitions.push([]);
            for (let column = 0; column < columns; ++column) {
                 partitions[row].push(new Set());
            }
        }
        return partitions;
    }
}