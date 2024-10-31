import { IProfile } from "../interfaces/users.interface";

export class CreateUserDto {
    username: string;
    password: string;
}

export class UpdateUserDto {
    userProfile: IProfile;
    mskProblem?:string[];
}