// example - 1
function one (call_two) {
    console.log('step 1 complete. please call step 2');
    call_two();
}

function two () {
    console.log('step 2');
}

one(two)


// example - 2

const order = (call_production) => {
    console.log('order placed, please call production');
    call_production();
}

const production = () => console.log('order received, starting production');
order(production);