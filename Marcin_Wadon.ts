// Maybe

type Maybe<A> =
  | { type: 'None' }
  | { type: 'Some', value: A}

// Will cause fromMaybe to ALWAYS return whenNone
function none(): Maybe<never>{
  return ({type: 'None'})
}

// Will cause fromMaybe to return value of whenSome if
function some<A>(a:A): Maybe<A> {
  return ({type: 'Some', value: a})
}

function fromMaybe<A, M>
  (fa: Maybe<A>, whenNone: M, whenSome: (a: A) => M): M {
    switch(fa.type){
      case 'None':
        return whenNone
      case 'Some':
        return whenSome(fa.value)
    }
}

//_______________________________________________________________
// Testing Maybe

const randomNumber = (): number => Math.floor(Math.random() * 1000)

const testingMaybe = (): string | undefined => {
  if(randomNumber() > 500){
    return "Here is a Value"
  }else{
    return undefined
  }
}

console.log(
  fromMaybe(some(testingMaybe()), undefined, val => val ),
)