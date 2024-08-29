// we have a sequence of asynchronous takes to be performed one after another

new Promise(function(resolve, reject) {
    setTimeout(() => resolve(1), 1000);
}).then(function(result) {
    console.log(result);
    return result * 2;
}).then((result) => console.log(result * 2)); 
/* A classic newbie error: technically we can also
add many .then to a single promise. This is not chaining. */


// Returning promises - A handler, used in .then(handler) may create and return a promise.
// In that case further handlers wait until it settles, and then get its result.
// Returning promises allows us to build chains of asynchronous actions.

// If a .then (or catch/finally, doesn’t matter) handler returns a promise, 
// the rest of the chain waits until it settles. When it does, its result (or error) is passed further.


function printIt(result) {
    return new Promise(function(resolve, reject) {
        console.log(result);
        resolve(result);
    })
}

new Promise((resolve, reject) => {
    setTimeout(() => resolve(1), 1000);
}).then((result) => {
    console.log(result, 'After one second...');

    return new Promise((resolve, reject) => {
        setTimeout(() => resolve(result * 2), 1000);
        console.log('After two second...');
    });
    
}).then((result) => {
    
    console.log(result);
    return result * 2;

}).then(printIt)

// example: fetch
let promise = fetch(url);

fetch('/article/promise-chaining/user.json')
  // .then below runs when the remote server responds
  .then(function(response) {
    // response.text() returns a new promise that resolves with the full response text
    // when it loads
    return response.text();
  })
  .then(function(text) {
    // ...and here's the content of the remote file
    alert(text); // {"name": "iliakan", "isAdmin": true}
  });


/*
As a good practice, an asynchronous action should always return a promise. 
That makes it possible to plan actions after it; even if we don’t plan to extend the chain
// */
//   function loadJson(url) {
//     return fetch(url)
//       .then(response => response.json());
//   }
  
//   function loadGithubUser(name) {
//     return loadJson(`https://api.github.com/users/${name}`);
//   }
  
//   function showAvatar(githubUser) {
//     return new Promise(function(resolve, reject) {
//       let img = document.createElement('img');
//       img.src = githubUser.avatar_url;
//       img.className = "promise-avatar-example";
//       document.body.append(img);
  
//       setTimeout(() => {
//         img.remove();
//         resolve(githubUser);
//       }, 3000);
//     });
//   }
  
//   // Use them:
//   loadJson('/article/promise-chaining/user.json')
//     .then(user => loadGithubUser(user.name))
//     .then(showAvatar)
//     .then(githubUser => alert(`Finished showing ${githubUser.name}`));
//     // ...