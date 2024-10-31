import { IsNotEmpty } from "@nestjs/class-validator";
export class SignUpDto {
    @IsNotEmpty()
    username: string;

    @IsNotEmpty()
    password: string;
}