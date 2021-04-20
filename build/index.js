"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var uuid_1 = require("uuid");
var unique_id_base_1 = require("./shared/unique-id.base");
var aggregate_root_base_1 = require("./shared/aggregate-root.base");
var specificatinon_1 = require("./shared/specificatinon");
var Person = /** @class */ (function (_super) {
    __extends(Person, _super);
    function Person(_id, _name, _age) {
        var _this = _super.call(this, _id) || this;
        _this._name = _name;
        _this._age = _age;
        return _this;
    }
    Object.defineProperty(Person.prototype, "name", {
        get: function () {
            return this._name;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Person.prototype, "age", {
        get: function () {
            return this._age;
        },
        enumerable: false,
        configurable: true
    });
    Person.create = function (name, age) {
        return new Person(unique_id_base_1.UniqueID.create(), name, age);
    };
    return Person;
}(aggregate_root_base_1.AggregateRoot));
var IsLegalAgeSpec = /** @class */ (function (_super) {
    __extends(IsLegalAgeSpec, _super);
    function IsLegalAgeSpec() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    IsLegalAgeSpec.prototype.isSatisfiedBy = function (person) {
        return person.age > 18;
    };
    return IsLegalAgeSpec;
}(specificatinon_1.AbstractSpecification));
var IsNotBoomerSpec = /** @class */ (function (_super) {
    __extends(IsNotBoomerSpec, _super);
    function IsNotBoomerSpec() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    IsNotBoomerSpec.prototype.isSatisfiedBy = function (person) {
        return person.age < 40;
    };
    return IsNotBoomerSpec;
}(specificatinon_1.AbstractSpecification));
var IsValidNameSpec = /** @class */ (function (_super) {
    __extends(IsValidNameSpec, _super);
    function IsValidNameSpec() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    IsValidNameSpec.prototype.isSatisfiedBy = function (person) {
        return person.name.length >= 3;
    };
    return IsValidNameSpec;
}(specificatinon_1.AbstractSpecification));
var guy = Person.create('John', 26);
var isPersonAllowedSpec = new IsLegalAgeSpec()
    .and(new IsValidNameSpec())
    .and(new IsNotBoomerSpec());
console.log(isPersonAllowedSpec.isSatisfiedBy(guy));
console.log(uuid_1.v4());
