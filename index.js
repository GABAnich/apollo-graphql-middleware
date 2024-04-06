const graphqlFlow = (...fns) => async (...args) => {
  if (fns.length === 1) {
    return fns[0](...args);
  }
  await fns[0](...args);
  return graphqlFlow(...fns.slice(1))(...args);
}

const wait = (ms) => new Promise(resolve => setTimeout(resolve, ms));

(async () => {

  console.log(
    await graphqlFlow(
      async (parent, args, context, info) => {
        context.res += 1000;
        await wait(1000); console.log('1000', parent, args, context, info)
      },
      () => { console.log('some sync fn in the middle');  },
      async (parent, args, context, info) => {
        context.res += 2000;
        await wait(2000); console.log('2000', parent, args, context, info)
      },
      async (parent, args, context, info) => {
        context.res += 3000;
        await wait(3000); console.log('3000', parent, args, context, info)
        return [{a: 1}, { res: context.res }]
      },
    )('parent', 'args', { res: 0 }, 'info')
  );

})();


