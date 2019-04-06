"use strict";
function left(l) {
    return ({ type: 'Left', left: l });
}
function right(r) {
    return ({ type: 'Right', right: r });
}
function fromEither(fa, whenLeft, whenRight) {
    switch (fa.type) {
        case 'Left':
            return whenLeft(fa.left);
        case 'Right':
            return whenRight(fa.right);
    }
}
//_________________________________________________________________
// Testing Either
var randomNumber_ = function () { return Math.floor(Math.random() * 1000); };
function ID(x) { return x; }
// Set the types for the return value here
var testingEither = function () {
    if (randomNumber_() >= 500) {
        return left("Greater than or equal to 500");
    }
    else {
        return right("Less Than 500");
    }
};
console.log(fromEither(testingEither(), ID, ID));
