"use strict";
// Maybe
// Will cause fromMaybe to ALWAYS return whenNone
function none() {
    return ({ type: 'None' });
}
// Will cause fromMaybe to return value of whenSome if
function some(a) {
    return ({ type: 'Some', value: a });
}
function fromMaybe(fa, whenNone, whenSome) {
    switch (fa.type) {
        case 'None':
            return whenNone;
        case 'Some':
            return whenSome(fa.value);
    }
}
//_______________________________________________________________
// Testing Maybe
var randomNumber = function () { return Math.floor(Math.random() * 1000); };
var testingMaybe = function () {
    if (randomNumber() > 500) {
        return some("Here is a Value");
    }
    else {
        return none();
    }
};
var showDescription = function (todo) { return todo.description; };
// Mock Todos
var todos = [
    { id: 1, description: 'Read a Book', completed: false }
];
// Create a Maybe<Todo> based on an id
var getTodo = function (id) {
    var todo = todos.find(function (todo) { return todo.id === id; });
    return todo ? some(todo) : none();
};
// Instantiate the Maybe<Todo> via an ID
var maybeTodo = getTodo(2);
// Here is the logic...
// If !exists: 'Missing Description'
// If  exists: showDescription
var description = fromMaybe(maybeTodo, 'Missing Description', showDescription);
console.log(description);
