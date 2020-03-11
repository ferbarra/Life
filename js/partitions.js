/**
 * Module
 * Partitions of a rectangular screen into a grid.
 * Each part of the grid can hold elements in it.
 */

function Partitions(width, height, rows, columns) {

    // Todo: Error handling

    let partitionWidth = width / rows;
    let partitionHeight = height / columns;
    let partitions = Array(rows * columns).fill(new Set());

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
    this.elementsInPartition = function(x, y) {        
        let partition = getPartitionFromCoordinates(x, y);
        // Return a copy of the partition, not a reference to the original
        return new Set(partition);
    }

    /**
     * Returns the partition containing the coordinates (x, y).
     * @param {*} x 
     * @param {*} y 
     */
    function getPartitionFromCoordinates(x, y) {
        let row = Math.floor(x / partitionWidth);
        let column = Math.floor(x / partitionHeight);
        let partitionIndex = row * column + column;
        return partitions[partitionIndex];
    }
}