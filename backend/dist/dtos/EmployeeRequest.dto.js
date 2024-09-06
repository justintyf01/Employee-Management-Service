"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.EmployeeRequestDto = void 0;
const class_validator_1 = require("class-validator");
const IsStrictlyNumber_1 = __importDefault(require("../decorators/IsStrictlyNumber"));
require("reflect-metadata");
class EmployeeRequestDto {
}
exports.EmployeeRequestDto = EmployeeRequestDto;
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], EmployeeRequestDto.prototype, "name", void 0);
__decorate([
    (0, IsStrictlyNumber_1.default)({ message: "Salary must be a number and not a string. Salary must be greater than or equal to 0." }),
    __metadata("design:type", Number)
], EmployeeRequestDto.prototype, "salary", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsIn)(["HR", "PS"], { message: "Department must be either 'HR' or 'PS'" }),
    __metadata("design:type", String)
], EmployeeRequestDto.prototype, "department", void 0);
