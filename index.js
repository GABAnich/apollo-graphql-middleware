const graphqlFlow = (...fns) => async (...args) => {
  if (fns.length === 1) {
    return fns[0](...args);
  }
  await fns[0](...args);
  return graphqlFlow(...fns.slice(1))(...args);
}

module.exports = graphqlFlow;
