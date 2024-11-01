import { IsArray, IsMongoId, IsNotEmpty, IsOptional, ValidateNested } from "class-validator";
import { IProfile } from "../interfaces/users.interface";
import { Type } from "class-transformer";

export class CreateUserDto {
    @IsNotEmpty()
    username: string;
    @IsNotEmpty()
    password: string;
}

export class UpdateUserDto {
    @ValidateNested()
    @IsOptional()
    @Type(() => UserProfileDto)
    userProfile: IProfile;
    
    @IsArray()
    @IsOptional()
    @IsMongoId({ each: true })
    mskProblems: string[];
}

export class UserProfileDto implements IProfile {
    @IsOptional()
    firstName: string;

    @IsOptional()
    lastName: string;

    @IsOptional()
    phoneNumber: string;

    @IsOptional()
    weight: number;

    @IsOptional()
    height: number;

    @IsOptional()
    dateOfBirth: Date;

    @IsOptional()
    gender: "male" | "female";

    @IsOptional()
    address: string;

    @IsOptional()
    avatar: string
}