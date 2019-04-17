"use strict";
// TYPE CLASSES
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var SameName = /** @class */ (function () {
    function SameName() {
    }
    SameName.eq = function (person1, person2) {
        return person1.name === person2.name;
    };
    return SameName;
}());
var Person = /** @class */ (function (_super) {
    __extends(Person, _super);
    function Person(name) {
        var _this = _super.call(this) || this;
        _this.name = name;
        return _this;
    }
    return Person;
}(SameName));
var tj = new Person("TJ");
var fred = new Person("Fred");
var tj2 = new Person("TJ");
console.log(Person.eq(tj, tj2));
