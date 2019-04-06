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
        return "Here is a Value";
    }
    else {
        return undefined;
    }
};
console.log(fromMaybe(some(testingMaybe()), undefined, function (val) { return val; }));
