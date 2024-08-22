let is_shop_open = true;

// const toppings_choice = () => {
//     return new Promise((resolve, reject) => {
//         setTimeout(() => {
//             resolve( console.log('which topping would you love ?'))
//         }, 3000)
//     })
// }

// async function kitchen () {
//     console.log('A')
//     console.log('B')
//     console.log('C')
//     await toppings_choice()
//     console.log('D')
//     console.log('E')
// }

// kitchen()

// console.log('doing')
// console.log('cleaning')
// console.log('taking')


// completely
function time (ms) {
    return new Promise((resolve, reject) => {
        if (is_shop_open) {
            setTimeout(resolve, ms)
        } else {
            reject(console.log('shop is closed'));
        }
    })
}

async function process () {
    try {
        await time(2000);
        console.log('the customer is ordering...');
        await time(0);
        console.log('the system is waiting for the order...')
        await time(1);
        console.log('the order received');
    }
    catch (err) {
        console.log('customer left', err)
    }
    finally {
        console.log('day ended shop is closed')
    }
}
process();