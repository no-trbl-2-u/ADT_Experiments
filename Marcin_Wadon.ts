type Option<A> =
  | { type: 'None' }
  | { type: 'Some', value: A}

function none(): Option<never>{
  return ({type: 'None'})
}

function some<A>(a:A): Option<A> {
  return ({type: 'Some', value: a})
}
