// ? promise.then(f1).catch(f2); Versus promise.then(f1, f2);

// answer: No, .then passes result/errors to the next .then/catch. So in the first example,
// there's a catch below, and in the second one there isn't, so the error is unhandled.