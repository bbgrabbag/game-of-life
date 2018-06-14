
function calculateNeighbors(i, dimension, grid) {
    let count = 0;
    for (let j = i - dimension; j <= i + dimension; j += dimension) {
        for (let k = -1; k <= 1; k++) {
            if (isValid(i, dimension, grid, j, k)) {
                if (grid[j + k]) count++;
            }
        }
    }
    return count;
}

function isValid(i, dimension, grid, j, k) {
    if (grid[j + k] === undefined) return false;
    if(j < 0) return false;
    if (j + k === i) return false;
    if (j + k < j && (j + k) % dimension > j % dimension) return false;
    if (j + k > j && (j + k) % dimension < j % dimension) return false;
    return true;
}

function determineStatus(status, neighborCount) {
    if (status) {
        if (neighborCount < 2)
            return false;
        if (neighborCount > 3)
            return false;
        return true;
    } else {
        if (neighborCount === 3)
            return true;
        return false;
    }
}

export const genGrid = (prevGrid, dimension) => {
    const output = [];
    prevGrid.forEach((status, i) => {
        const neighborCount = calculateNeighbors(i, dimension, prevGrid);
        output.push(determineStatus(status, neighborCount))
    });
    return output;
}