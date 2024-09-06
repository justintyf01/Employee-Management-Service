import { IsString, IsIn, IsInt, Min, ValidateIf } from "class-validator";
import { Type } from "class-transformer";
import IsStrictlyNumberGreaterThanZero from "../decorators/IsStrictlyNumber";
import "reflect-metadata";

export class LoginDto {
    @IsString()
    username: string;

    @IsString()
    password: string;
}
