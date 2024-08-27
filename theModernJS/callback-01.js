// function loadForTwoSec(data, callback, time) {
//     setTimeout(() => {
//         console.log(data);
//         callback();
//     },time);

// }

// loadForTwoSec('start...', () => console.log('end...'), 2000);

// callback in callback
// loadForTwoSec('start...', () => {
//     loadForTwoSec('start for second one...', () => {
//         loadForTwoSec('start for third one...', () => {
//             console.log('all set')
//         }, 2000);
//     }, 2000);
// }, 2000);


// Handling errors
function loadForImportant(data, check, time) {
    setTimeout(() => {
        if (data === 'correct') {
            check(null, data);
        } else {
            check(new Error('the data is wrong'));
        }
    }, time)
}
loadForImportant('correctt', function(error, data) {
    if (error) {
        console.log(error);
    } else {
        console.log(data);
    }
}, 2000)

// Pyramid of Doom
loadScript('1.js', function(error, script) {

    if (error) {
      handleError(error);
    } else {
      // ...
      loadScript('2.js', function(error, script) {
        if (error) {
          handleError(error);
        } else {
          // ...
          loadScript('3.js', function(error, script) {
            if (error) {
              handleError(error);
            } else {
              // ...continue after all scripts are loaded (*)
            }
          });
  
        }
      });
    }
  });
/**
 * We load 1.js, then if there’s no error…
 * We load 2.js, then if there’s no error…
 * We load 3.js, then if there’s no error – do something else (*).
 */