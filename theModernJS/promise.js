// Producing code
let promise = new Promise(function(resolve, reject) {
    // The function is execute automatically when the promise is constructed

    // after 1 second signal that the job is done with the result "done"
    setTimeout(() => resolve("done"), 1000);

    // after 1 second signal that the job is finished with an error
    setTimeout(() => reject(new Error("Whoops!")), 1000);
})

// There can be only a single result or an error
let promise2 = new Promise(function(resolve, reject) {
    resolve('done');

    reject(new Error("...")); // ignored
    setTimeout(() => resolve("...")); // ignored
});

// Immediately calling resolve/reject
let promise3 = new Promise(function(resolve, reject) {
    // not taking our time to do the job
    resolve(123); // immediately give the result: 123
});

// Consumers: then, catch
promise.then(
    function(result) { /* handle a successful result */ },
    function(error) { /* handle an error */ }
  );

let promise4 = new Promise(function(resolve, reject) {
    setTimeout(() => resolve("done!"), 1000);
  });
  
  // resolve runs the first function in .then
  promise4.then(
    result => alert(result), // shows "done!" after 1 second
    error => alert(error) // doesn't run
  );

// If we're interested only in successful completions, then we can provide only one
// function argument to .then
let promise5 = new Promise(resolve => {
    setTimeout(() => resolve("done!"), 1000);
  });
  
  promise5.then(alert); // shows "done!" after 1 second

// If we’re interested only in errors, then we can use null as the first argument:
// .then(null, errorHandlingFunction). Or we can use .catch(errorHandlingFunction)
let promise6 = new Promise((resolve, reject) => {
    setTimeout(() => reject(new Error("Whoops!")), 1000);
  });
  
  // .catch(f) is the same as promise.then(null, f)
  promise.catch(alert); // shows "Error: Whoops!" after 1 second

//  Cleanup: finally
new Promise((resolve, reject) => {
    // do something that takes time, and then call resolve or maybe reject
})
    // runs when the promise is settled, doesn't matter successfully or not
    .finally(() => console.log('stop loading indicator'))
    // so the loading indicator is always stopped before we go on
    .then(result => console.log('show result') => console.log('show error'))
// A finally handler has no arguments.
// A finally handler "passes through"
new Promise((resolve, reject) => {
    setTimeout(() => resolve("value"), 2000);
  })
    .finally(() => alert("Promise ready")) // triggers first
    .then(result => alert(result)); // <-- .then shows "value"

new Promise((resolve, reject) => {
    throw new Error("error");
    })
    .finally(() => alert("Promise ready")) // triggers first
    .catch(err => alert(err));  // <-- .catch shows the error
// A finally handler also shouldn't return anything.

