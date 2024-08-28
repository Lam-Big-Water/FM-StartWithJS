// Handling errors
// function loadForImportant(data, check, time) {
//     setTimeout(() => {
//         if (data === 'correct') {
//             check(null, data);
//         } else {
//             check(new Error('the data is wrong'));
//         }
//     }, time)
// }
// loadForImportant('correctt', function(error, data) {
//     if (error) {
//         console.log(error);
//     } else {
//         console.log(data);
//     }
// }, 2000)

// Pyramid of Doom
// loadScript('1.js', function(error, script) {

//     if (error) {
//       handleError(error);
//     } else {
//       // ...
//       loadScript('2.js', function(error, script) {
//         if (error) {
//           handleError(error);
//         } else {
//           // ...
//           loadScript('3.js', function(error, script) {
//             if (error) {
//               handleError(error);
//             } else {
//               // ...continue after all scripts are loaded (*)
//             }
//           });
  
//         }
//       });
//     }
//   });

// promise handler
// function loadForPromise(data, time) {
//     return new Promise(function(resolve, reject) {
//         setTimeout(() => {
//             if (data === 'correct') {
//                 resolve(data);
//             } else {
//                 reject(new Error('the data is wrong...'));
//             }
//         }, time)
//     })
// }

// let promise = loadForPromise('correct', 2000);

// promise.then(
//     result => console.log(result),
//     error => console.log(error.message)
// )
// promise.then(result => console.log(`${result} => Another handler...`))
// promise.then(result => console.log(result + '1'));


// Tasks
// let promise_tasks = new Promise (function(resolve, reject) {
//     resolve(1);

//     setTimeout(() => {
//         resolve(2)
//         console.log('1...')
//     }, 1000);

// });
// promise_tasks.then(console.log);
// Answer => 1. The second call to resolve is ignored,
// because only the first call of reject/resolve is taken into account. Further calls are ignored.

// function delay (ms) {
//     return new Promise(resolve => setTimeout(resolve, ms));
// }
// delay(3000).then(() => console.log('runs after 3 seconds'));


