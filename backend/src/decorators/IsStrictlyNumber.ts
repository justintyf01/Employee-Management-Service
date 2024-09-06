import { registerDecorator, ValidationOptions, ValidationArguments } from "class-validator";

export default function IsStrictlyNumberGreaterThanZero(validationOptions?: ValidationOptions) {
    return function (object: Object, propertyName: string) {
        registerDecorator({
            name: "isStrictlyNumber",
            target: object.constructor,
            propertyName: propertyName,
            options: validationOptions,
            validator: {
                validate(value: any, args: ValidationArguments) {
                    return typeof value === "number" && !isNaN(value) && value >= 0;
                },
                defaultMessage(args: ValidationArguments) {
                    return `${args.property} must be a number and not a string`;
                },
            },
        });
    };
}
