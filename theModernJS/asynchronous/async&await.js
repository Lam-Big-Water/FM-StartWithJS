 async function loadSec(data) {
   await new Promise(resolve => setTimeout(() => {
    resolve(data)
   }, 2000));

   return 10;
}

function f() {
  loadSec().then(result => console.log(result));
}

f();
