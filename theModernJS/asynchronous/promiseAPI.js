// Let’s say we want many promises to execute in parallel and wait until all of them are ready.
let promiseAll = Promise.all([
    new Promise(resolve => setTimeout(() => resolve(1), 3000)),
    new Promise(resolve => setTimeout(() => resolve(2), 2000)),
    new Promise(resolve => setTimeout(() => resolve(3), 1000)),
]).then(console.log); // [ 1, 2, 3 ]
                        // Please note that the order of the resulting array members is 
                        // the same as in its source promises.

// A common trick is to map an array of job data into an array of promises,
// and then wrap that into Promise.all.
let urls = [
    'https://api.github.com/users/iliakan',
    'https://api.github.com/users/remy',
    'https://api.github.com/users/jeresig'
  ];
  
  // map every url to the promise of the fetch
  let requests = urls.map(url => fetch(url));
  
  // Promise.all waits until all jobs are resolved
  Promise.all(requests)
    .then(responses => responses.forEach(
      response => alert(`${response.url}: ${response.status}`)
    ));
// A bigger example with fetching user information for an array of GitHub users 
// by their names (we could fetch an array of goods by their ids, the logic is identical):
let names = ['iliakan', 'remy', 'jeresig'];

let requests_2 = names.map(name => fetch(`https://api.github.com/users/${name}`));

Promise.all(requests)
  .then(responses => {
    // all responses are resolved successfully
    for(let response of responses) {
      alert(`${response.url}: ${response.status}`); // shows 200 for every url
    }

    return responses;
  })
  // map array of responses into an array of response.json() to read their content
  .then(responses => Promise.all(responses.map(r => r.json())))
  // all JSON answers are parsed: "users" is the array of them
  .then(users => users.forEach(user => alert(user.name)));

//  If any of the promises is rejected, 
// the promise returned by Promise.all immediately rejects with that error.
Promise.all([
    new Promise((resolve, reject) => setTimeout(() => resolve(console.log('1')), 1000)),
    new Promise((resolve, reject) => setTimeout(() => reject(new Error("Whoops!")), 2000)),
    new Promise((resolve, reject) => setTimeout(() => resolve(3), 3000))
  ]).catch(console.log);
  /*
    1,
    Error: Whoops!
    if there are multiple fetch calls, like in the example above, and one fails, 
    the others will still continue to execute, but Promise.all won’t watch them anymore. They will probably settle, but their results will be ignored.
  */

// Promise.all(iterable) allows non-promise “regular” values in iterable
Promise.all([
    new Promise((resolve, reject) => {
      setTimeout(() => resolve(1), 1000)
    }),
    2,
    3
  ]).then(alert); // 1, 2, 3

// For example, we’d like to fetch the information about multiple users.
// Even if one request fails, we’re still interested in the others.
Promise.allSettled([
    new Promise((resolve, reject) => setTimeout(() => resolve(1), 1000)),
    new Promise((resolve, reject) => setTimeout(() => reject(new Error("Whoops!")), 2000)),
    new Promise((resolve, reject) => setTimeout(() => resolve(3), 3000))
  ]).then(console.log);
  /*
    (3) [{…}, {…}, {…}]
        0
        : 
        {status: 'fulfilled', value: 1}
        1
        : 
        {status: 'rejected', reason: Error: Whoops! at <anonymous>:3:62}
        2
        : 
        {status: 'fulfilled', value: 3}
        length
        : 
        3
  */

// Similar to Promise.all, but waits only for the first settled promise and gets its result (or error).
Promise.race([
    new Promise((resolve, reject) => setTimeout(() => resolve(1), 1000)),
    new Promise((resolve, reject) => setTimeout(() => reject(new Error("Whoops!")), 2000)),
    new Promise((resolve, reject) => setTimeout(() => resolve(3), 3000))
  ]).then(alert); // 1 The first promise here was fastest, so it became the result. 
                    // After the first settled promise “wins the race”, all further results/errors are ignored.

// Similar to Promise.race, but waits only for the first fulfilled promise and gets its result.
Promise.any([
    new Promise((resolve, reject) => setTimeout(() => reject(new Error("Whoops!")), 1000)),
    new Promise((resolve, reject) => setTimeout(() => resolve(1), 2000)),
    new Promise((resolve, reject) => setTimeout(() => resolve(3), 3000))
  ]).then(alert); // 1
                    // The first promise here was fastest, but it was rejected, 
                    // so the second promise became the result. After the first fulfilled promise “wins the race”, all further results are ignored.

// Here’s an example when all promises fail:
Promise.any([
    new Promise((resolve, reject) => setTimeout(() => reject(new Error("Ouch!")), 1000)),
    new Promise((resolve, reject) => setTimeout(() => reject(new Error("Error!")), 2000))
  ]).catch(error => {
    console.log(error.constructor.name); // AggregateError
    console.log(error.errors[0]); // Error: Ouch!
    console.log(error.errors[1]); // Error: Error!
  });

// Promise.resolve(value) creates a resolved promise with the result value.
let promise = new Promise(resolve => resolve(value));

// For example, the loadCached function below fetches a URL and remembers (caches) its content.
let cache = new Map();

function loadCached(url) {
  if (cache.has(url)) {
    return Promise.resolve(cache.get(url)); // (*)
  }

  return fetch(url)
    .then(response => response.text())
    .then(text => {
      cache.set(url,text);
      return text;
    });
}
// We can write loadCached(url).then(…), because the function is guaranteed to return a promise.
// We can always use .then after loadCached. That’s the purpose of Promise.resolve in the line (*).

// Promise.reject(error) creates a rejected promise with error.
let promise_2 = new Promise((resolve, reject) => reject(error));