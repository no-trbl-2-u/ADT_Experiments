"use strict";
function none() {
    return ({ type: 'None' });
}
function some(a) {
    return ({ type: 'Some', value: a });
}
