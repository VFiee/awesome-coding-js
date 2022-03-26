// function lazyMan(name) {
//   const hi = () => {
//     console.log(`Hi! This is ${name}!`)
//     return ctx
//   }
//   const eat = food => {
//     console.log(`Eat ${food}!`)
//     return ctx
//   }
//   const sleep = (seconds = 0) => {
//     debugger
//     setTimeout(() => {
//       return ctx
//     }, seconds * 1000)
//   }
//   const sleepFirst = seconds => {
//     sleep(seconds)
//   }
//   const ctx = {
//     eat,
//     sleep,
//     sleepFirst
//   }
//   return hi()
// }

function lazyMan(name) {
  const { log } = console
  const sleep = s =>
    new Promise(res =>
      setTimeout(() => log(`Wake up after ${s}`) || res(), s * 1000)
    )
  const stack = [() => log(`Hi! This is ${name}!`)]
  const ctx = {
    eat: food => stack.push(() => log(`Eat ${food}~`)) && ctx,
    sleep: s => stack.push(() => sleep(s)) && ctx,
    sleepFirst: s => stack.unshift(() => sleep(s)) && ctx
  }
  queueMicrotask(async () => {
    while (stack.length) {
      await stack.shift()()
    }
  })
  return ctx
}

lazyMan('Vyron').eat('Apple').sleep(3).eat('Orange')
