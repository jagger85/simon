

const itr = [...Array(4)].map(()=>Math.floor(Math.random()*4)).entries();
console.log(itr)
console.log(itr.next())
console.log(itr.next().value)

// function createSequence(){
//     const itr = [...Array(5)].map(()=>Math.floor(Math.random()*4)).entries()
//     return itr
// }
// console.log(createSequence())

// console.log(itr.next().value[1])
// console.log(itr.next().done)
// console.log(itr.next())
// console.log(itr.next())
// console.log(itr.next())