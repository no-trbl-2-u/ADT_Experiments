# Count
How many possible values
* Boolean - 2
* Byte - 256
* Integer - 3-4 billion
* String - Infinity

# Product Types
## Tuple
```typescript
type Tuple = [number, string]
type Tuple = [string, number]
```

>Are they Equal ? NO!

## Record
```typescript
type Money = {
  amount: number,
  currency: string,
}
type Amount = Money['amount']
type Currency = Money['currency']
```
# Selection
*I would like to have a NonEmptyList of Elements, and I would like to select one of those Elements*

### Problematic Version
```typescript
interface Selection<A> {
  items: A[];       // <-- ERROR Could be empty
  current: number;  // <-- ERROR Index could be out of range
}
```
## Zipper Pattern
### Better Version
```typescript
interface Zipper<A> {
  prev: A[];
  current: A;
  next: A[];
}
```

# Sum Types

```typescript
enum TodoAction {
  Add = '[Todo] Add',
  Update = '[Todo] Update',
  Complete = '[Todo] Complete',
  Delete = '[Todo] Delete'
}
// Union type from enum
type Action =
  | {type: TodoAction.Add, text: string}
  | {type: TodoAction.Update, text: string}
  | {type: TodoAction.Complete}
  | {type: TodoAction.Delete, id: number}
```

## Pattern Matching
### *Redux Example*

```typescript
type Todo = { id: number, text: string, completed: false }
type State = Todo[]

function reducer(state: State, action: Action): State{
  switch(action.type.TodoAction){
    case Add:
      return state
    case Update:
      return state
    case Complete:
      return state
    case Delete:
      return state      
  }

  // HERE
}
```

Inside of each switch case, you will have TYPE SUPPORT! Errors will trigger if anything inside the switch statement contradicts the type definitions defined in ```type Action...```

Also, for where the ```// HERE``` is located, there will be an ERROR if we were to remove one of these case statements because there would then be a possibility that the switch statement could receive a case that doesn't exist.

## Widget

### Problematic Version
* Not Explicit on why onChange is optional
* ERRORS in corner cases
* Not enough intelliSense
```typescript
type Widget = {
  editable: boolean,
  onChange?: (text: string) => void
}

const Widget = (widget: Widget) => {
  if(widget.editable) {
    const onChange = widget.onChange
  }
}
```

### Better Solution
```typescript
type Widget =
  | { editable: false }
  | { editable: true, onChange: (text: string) => void }

const Widget = (widget: Widget) => {
  if(widget.editable) {
    widget.onChange
  }
  if(!widget.editable) {
    // widget.onChange // ERROR, doesn't exist
  }
}
```

By using a Union Type w/ hard coded values (Sum Type) you can have a dynamic type based on an internal property

# Error Handling
## Option (Monad)

```typescript
type Option<A> =
  | { type: 'None' }
  | { type: 'Some', value: A}

function none(): Option<never>{
  return ({type: 'None'})
}

function some<A>(a:A): Option<A>{
  return ({type: 'Some', value: a})
}

function fromOption<A, O>
  (fa: Option<A>, whenNone: O, whenSome: (a: A) => O): O {
    switch(fa.type){
      case 'None':
        return whenNone
      case 'Some':
        return whenSome(fa.value)
    }
}
```