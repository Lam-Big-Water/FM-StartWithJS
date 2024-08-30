// basic
fetch('https://no-such-server.blabla') // rejects
  .then(response => response.json())
  .catch(err => alert(err)) // TypeError: failed to fetch (the text may vary)

// Implicit try...catch
new Promise((resolve, reject) => {
    throw new Error("Whoops!");
  }).catch(alert); // Error: Whoops!
// - Works exactly the same as this:
new Promise((resolve, reject) => {
    reject(new Error("Whoops!"));
  }).catch(alert); // Error: Whoops!

// - This happens not only in the executor function, but in its handlers as well.
// If we throw inside a .then handler, that means a rejected promise, so the control jumps to the nearest error handler.
new Promise((resolve, reject) => {
    resolve("ok");
  }).then((result) => {
    throw new Error("Whoops!"); // rejects the promise
  }).catch(alert); // Error: Whoops!

// - This happens for all errors, not just those caused by the throw statement. For example, a programming error:
new Promise((resolve, reject) => {
    resolve("ok");
  }).then((result) => {
    blabla(); // no such function
  }).catch(alert); // ReferenceError: blabla is not defined

// Rethrowing
// - If we throw inside .catch, then the control goes to the next closest error handler. 
// And if we handle the error and finish normally, then it continues to the next closest successful .then handler.
// the execution: catch -> then
new Promise((resolve, reject) => {

    throw new Error("Whoops!");
  
  }).catch(function(error) {
  
    alert("The error is handled, continue normally");
  
  }).then(() => alert("Next successful handler runs"));

// - another example - can't not handle
// the execution: catch -> catch
new Promise((resolve, reject) => {

    throw new Error("Whoops!");
  
  }).catch(function(error) { // (*)
  
    if (error instanceof URIError) {
      // handle it
    } else {
      alert("Can't handle such error");
  
      throw error; // throwing this or another error jumps to the next catch
    }
  
  }).then(function() {
    /* doesn't run here */
  }).catch(error => { // (**)
  
    alert(`The unknown error has occurred: ${error}`);
    // don't return anything => execution goes the normal way
  
  });

// Unhandled rejections
// For instance, we forgot to append .catch to the end of the chain, like here:
new Promise(function() {
    noSuchFunction(); // Error here (no such function)
  })
    .then(() => {
      // successful promise handlers, one or more
    }); // without .catch at the end!
            // So the error gets “stuck”. 

//? What happens when a regular error occurs and is not caught by try..catch? 
window.addEventListener('unhandledrejection', function(event) {
    // the event object has two special properties:
    alert(event.promise); // [object Promise] - the promise that generated the error
    alert(event.reason); // Error: Whoops! - the unhandled error object
  });
  
  new Promise(function() {
    throw new Error("Whoops!");
  }); // no catch to handle the error
        // The JavaScript engine tracks such rejections and generates a global error in that case.
        // You can see it in the console if you run the example above.
            // In the browser we can catch such errors using the event unhandledrejection
                // In non-browser environments like Node.js there are other ways to track unhandled errors.