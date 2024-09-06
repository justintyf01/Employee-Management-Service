import { IsString, IsIn, IsInt, Min, ValidateIf } from 'class-validator';
import { Type } from "class-transformer";
import IsStrictlyNumberGreaterThanZero from "../decorators/IsStrictlyNumber";
import "reflect-metadata";

export class EmployeeRequestDto {
    @IsString()
    name: string;

    // @Min(0, { message: "Salary must be greater than or equal to 0" })
    @IsStrictlyNumberGreaterThanZero({ message: "Salary must be a number and not a string. Salary must be greater than or equal to 0." })
    @IsInt()
    salary: number;

    @IsInt({ message: "Department must be a number and not a string" })
    // @IsIn(["HR", "PS"], { message: "Department must be either 'HR' or 'PS'" })
    // @IsStrictlyNumberGreaterThanZero()
    departmentId: number;
}