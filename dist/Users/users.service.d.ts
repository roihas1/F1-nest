import { Repository } from 'typeorm';
import { User } from '../entities/user.entity';
import { UserDto } from '../DTO/user.dto';
import { UserLoginDto } from "src/DTO/userLogin.dto";
export declare class UsersService {
    private readonly userRepository;
    constructor(userRepository: Repository<User>);
    createUser(UserDto: UserDto): Promise<User>;
    getUserByUserName(username: string): Promise<User>;
    login(user: UserLoginDto): Promise<User>;
    updateUser(user: UserDto): Promise<User>;
}
