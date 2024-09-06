import UserService from "../services/user.service";
import User from "../models/user.model";
import { UserRequestDto } from "../dtos/UserRequest.dto";
import { LoginDto } from "../dtos/Login.dto";

export default class UserController {
    userService: UserService;

    constructor() {
        this.userService = new UserService();
    }

    async getAllUsers(page: number) {
        return await this.userService.getAllUsers();
    }

    async signUp(userRequestDto: UserRequestDto) {
        return await this.userService.signUp(userRequestDto);
    }

    async login(loginDto: LoginDto) {
        return await this.userService.login(loginDto);
    }


}
