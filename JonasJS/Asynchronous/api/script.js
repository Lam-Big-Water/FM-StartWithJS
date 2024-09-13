const getJSON = async (url) => {
    const res = await fetch(url);
    return await res.json();
}

// const get3Countries = async function (c1, c2, c3) {
//     try {
//         const data = await Promise.all([
//             getJSON(`https://restcountries.com/v3.1/name/${c1}`),
//             getJSON(`https://restcountries.com/v3.1/name/${c2}`),
//             getJSON(`https://restcountries.com/v3.1/name/${c3}`),
//         ]);
//         console.log(data.map(d => d[0].capital));
//     } catch (e) {
//         console.error(e);
//     }
// };
// get3Countries('portugal', 'canada', 'tanzania');

// Promise.race
// (async function() {
//     const res =  await Promise.race([
//         getJSON(`https://restcountries.com/v3.1/name/italy`),
//         getJSON(`https://restcountries.com/v3.1/name/egypt`),
//         getJSON(`https://restcountries.com/v3.1/name/mexico`),
//     ]);
//     console.log(res[0]);
// })();

// Delayer
// const timeout = function (sec) {
//     return new Promise(function (_, reject) {
//         setTimeout(() => reject(new Error('Request took too long!')), sec * 1000)
//     })
// }

// Promise.race([
//     getJSON(`https://restcountries.com/v3.1/name/italy`),
//     timeout(1),
// ])
//     .then(res => console.log(res[0]))
//     .catch(err => console.error(err));

// Promise.allSettled
Promise.allSettled([
    Promise.resolve('Success'),
    Promise.reject('Error'),
    Promise.resolve('Another success'),
]).then(res => console.log(res));

/*
[
  { status: 'fulfilled', value: 'Success' },
  { status: 'rejected', reason: 'Error' },
  { status: 'fulfilled', value: 'Another success' }
]
*/

/* 
This returned promise fulfills when any of the input's promises fulfills, 
with this first fulfillment value.

It rejects when all of the input's promises reject (including when an empty iterable is passed),
with an AggregateError containing an array of rejection reasons.

*/
Promise.any([
    Promise.reject('Error'),
    Promise.resolve('Success'),
    Promise.resolve('Another success'),
])
    .then(res => console.log(res))
    .catch(err => console.error(err));