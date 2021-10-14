export const _filter = (f, iter) => {
  let res = [];
  for(const a of iter){
    if(f(a)) res.push(a);
  }
  return res;
}

export const _map = (f, iter) => {
  let res = [];
  for(const a of iter){
    res.push(f(a));
  }
  return res;
} 

export const _reduce = (f, acc, iter) => {
  if(!iter){
    iter = acc[Symbol.iterator]();
    acc = iter.next().value;
  }
  for(const a of iter){
    acc = f(acc, a);
  }
  return acc;
} 

export const _add = (a, b) => a + b;
