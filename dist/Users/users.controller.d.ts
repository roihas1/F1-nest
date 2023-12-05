import { UsersService } from './users.service';
import { CreateUserDto } from './dto/CreateUser.dto';
export declare class UsersController {
    private readonly userService;
    constructor(userService: UsersService);
    createUser(createUserDto: CreateUserDto): Promise<string>;
}
