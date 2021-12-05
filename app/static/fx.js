export const { L, C } = window._;

export const groupBySize = _.groupBySize = _.curry((size, iter) => {
  let r = L.range(Infinity);
  return _.groupBy(_ => Math.floor(r.next().value / size), iter);
})