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

const testingMaybe = (): Maybe<string> => {
  if(randomNumber() > 500){
    return some("Here is a Value")
  }else{
    return none()
  }
}

// console.log(
//   fromMaybe(testingMaybe(), "shit", val => val ),
// )
//_______________________________________________________________
// Real-life Maybe

type Todo = { id: number, description: string, completed: boolean }
const showDescription = (todo: Todo) => todo.description

// Mock Todos
const todos: Todo[] = [
  {id: 1, description: 'Read a Book', completed: false}
]

// Create a Maybe<Todo> based on an id
const getTodo = (id: number): Maybe<Todo> => {
  const todo = todos.find(todo => todo.id === id)
  return todo ? some(todo) : none()
}

// Instantiate the Maybe<Todo> via an ID
const maybeTodo: Maybe<Todo> = getTodo(2)

// Here is the logic...
// If !exists: 'Missing Description'
// If  exists: showDescription
const description = fromMaybe(
  maybeTodo,
  'Missing Description',
  showDescription
)

console.log(description)