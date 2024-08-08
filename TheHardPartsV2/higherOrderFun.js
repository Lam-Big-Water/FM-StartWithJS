function copyArrayAndManipulate (array, instructions) {
    const output = [];

    for (let n = 0; n < array.length; n++) {
        output.push(instructions(array[n]));
    }

    return output;
}

function multiplyBy2 (input) {return input * 2;};

const result = copyArrayAndManipulate([1, 2, 3], multiplyBy2);