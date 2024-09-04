// ? promise.then(f1).catch(f2); Versus promise.then(f1, f2);

// answer: No, .then passes result/errors to the next .then/catch. So in the first example,
// there's a catch below, and in the second one there isn't, so the error is unhandled. 

var promiseAll = function(fns) {
    return new Promise((resolve, reject) => {
        const results = [];
        let resolvedCount = 0;
        let rejected = false;

        for (let i = 0; i < fns.length; i++) {
            fns[i]()
                .then(result => {
                    if (!rejected) {
                        results[i] = result;
                        resolvedCount++;

                        if (resolvedCount === fns.length) {
                            resolve(results);
                        }
                    }
                })
                .catch(error => {
                    if (!rejected) {
                        rejected = true;
                        reject(error);
                    }
                })
        }

    })
}
const functionArr = [
    () => new Promise(resolve => setTimeout(() => resolve(4), 50)), 
    () => new Promise(resolve => setTimeout(() => resolve(10), 150)), 
    () => new Promise(resolve => setTimeout(() => resolve(16), 100)),
    () => new Promise(resolve => setTimeout(() => {
        resolve(32);
        console.log('final');
    }, 1000))
]

promiseAll(functionArr)
.then((results) => {
    console.log(results, 'final');
})