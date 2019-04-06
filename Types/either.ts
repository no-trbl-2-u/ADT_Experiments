// Either
type Left<L> = {type: 'Left', left: L}
type Right<R> = {type: 'Right', right: R}

type Either<L, R> = 
  | Left<L>
  | Right<R>

function left<L>(l:L): Left<L> {
  return({type: 'Left', left: l})
}

function right<R>(r:R): Right<R> {
  return({type: 'Right', right: r})
}

function fromEither<L, R>(
  fa: Either<L, R>,
  whenLeft: (val: L) => L,
  whenRight: (val: R) => R
  ): L | R {
    switch(fa.type){
      case 'Left':
        return whenLeft(fa.left)
      case 'Right':
        return whenRight(fa.right)
    }
  }
//_________________________________________________________________
// Testing Either

const randomNumber_ = (): number => Math.floor(Math.random() * 1000)
function ID<T>(x:T){return x}

// Set the types for the return value here
const testingEither = (): Left<string> | Right<string> => {
  if(randomNumber_() >= 500){
    return left("Greater than or equal to 500")
  }else{
    return right("Less Than 500")
  }
}
console.log(fromEither(testingEither(), ID, ID))
