import { UsersService } from './users.service';
import { UserDto } from '../DTO/user.dto';
import { UserLoginDto } from '../DTO/userLogin.dto';
export declare class UsersController {
    private readonly userService;
    constructor(userService: UsersService);
    createUser(user: UserDto): Promise<string>;
    getUser(username: string): Promise<import("../entities/user.entity").User>;
    login(user: UserLoginDto): Promise<"Login failed - username or password are incorrect" | "Login seccessful">;
    updateUser(user: UserDto): Promise<string>;
}
