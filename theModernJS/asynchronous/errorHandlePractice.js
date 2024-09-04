// Will the .catch trigger?
new Promise(function(resolve, reject) {
    setTimeout(() => {
        throw new Error("Whoops!");
    }, 1000);
}).catch(console.log)
/*
As said in the chapter, there’s an "implicit try..catch" around the function code.
So all synchronous errors are handled.

But here the error is generated not while the executor is running, 
but later. So the promise can’t handle it.
*/