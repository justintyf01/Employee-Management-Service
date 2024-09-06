import { IsString, IsIn, IsInt, Min, ValidateIf } from "class-validator";
import { Type } from "class-transformer";
import IsStrictlyNumberGreaterThanZero from "../decorators/IsStrictlyNumber";
import "reflect-metadata";

export class UserRequestDto {
    @IsString()
    username: string;

    @IsString()
    password: string;

    @IsInt()
    // @IsIn(["Admin", "HR", "PS"], { message: "Department must be 'Admin, 'HR' or 'PS'" })
    departmentId: number;
}
