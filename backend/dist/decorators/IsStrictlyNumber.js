"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = IsStrictlyNumberGreaterThanZero;
const class_validator_1 = require("class-validator");
function IsStrictlyNumberGreaterThanZero(validationOptions) {
    return function (object, propertyName) {
        (0, class_validator_1.registerDecorator)({
            name: "isStrictlyNumber",
            target: object.constructor,
            propertyName: propertyName,
            options: validationOptions,
            validator: {
                validate(value, args) {
                    return typeof value === "number" && !isNaN(value) && value >= 0;
                },
                defaultMessage(args) {
                    return `${args.property} must be a number and not a string`;
                },
            },
        });
    };
}
