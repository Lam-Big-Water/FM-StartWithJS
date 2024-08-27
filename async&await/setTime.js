const cancellable = function(fn, args, t) {
    // cancelFn function//
    const cancelFn = function (){
      clearTimeout(timer);
      console.log('pause')
  };
  const timer = setTimeout(()=>{
      console.log(fn(...args), 'finished')
  }, t);
  
  return cancelFn ;
};

const fn = (x) => x * 5;

const args = [2];

const t = 20;

const cancelT = 21;

const start = cancellable(fn, args, t);
setTimeout(start, cancelT);