import { LoginDto } from "../dtos/Login.dto";
import { UserRequestDto } from "../dtos/UserRequest.dto";
import { BadRequestError, InternalServerError, NotFoundError, UnauthorisedError } from "../models/errors/Errors";
import User from "../models/user.model";
import bcrypt from "bcryptjs";

export default class UserService {
    async getAllUsers() {
        return await User.findAll();
    }

    async signUp(userRequestDto: UserRequestDto) {
        // Check if username exists
        const username = userRequestDto.username.toLowerCase();
        const user = await User.findOne({ where: { username } });
        if (user) {
            throw new BadRequestError(`Username ${username} is not available`);
        }
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(userRequestDto.password, salt);

        const newUser = await User.create({
            ...userRequestDto,
            username,
            password: hashedPassword,
        });

        return newUser;
    }

    async login(loginDto: LoginDto) {
        try {
            // Check if user exists and password match
            const username = loginDto.username.toLowerCase();
            const user = await User.findOne({ where: { username } });

            if (!user) {
                throw new NotFoundError("User not found");
            }

            if (!(await bcrypt.compare(loginDto.password, user.password))) {
                throw new UnauthorisedError("Invalid credentials");
            }

            // Generate token storing session data
            return user.departmentId;
        } catch (error) {
            throw new InternalServerError("Error during login" + error);
        }
    }
}
