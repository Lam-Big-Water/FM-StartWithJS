let is_shop_open = false;

const order = (time, work) => {
    return new Promise ((resolve, reject) => {
        if (is_shop_open) {
            setTimeout(() => {
                resolve(work());
            }, time);
        } else {
            reject(console.log("our shop is closed"));
        }
    })
}

// order(2000, () => console.log('the customer is ordering the food'));
// console.log('the system is waiting for the order');
// order(2001, () => console.log('the order received'));

// use Promise chaining

order(2000, () => console.log('the customer is ordering the food'))
    .then(() => {
        return order(0, () => console.log('the system is waiting for the order'));
    })
    .then(() => {
        return order(1000, () => console.log('the order received'));
    })

    .catch(() => {
        console.log('Customer left');
    })

    .finally(() => {
        console.log('day ended, shop is closed');
    })