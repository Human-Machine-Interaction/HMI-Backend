
import { Injectable } from '@nestjs/common';
import { Iuser } from './interfaces/users.interface';


@Injectable()
export class UsersService {
    private readonly users: Iuser[] = [
        {
            username: "john_doe",
            password: "$2a$13$zBo509bAuzSQysIxqchoB.PvsuLwMfZeELkPcZ7NifIQQO6rU6DVG",
            role: "doctor",
            userProfile: {
                firstName: "John",
                lastName: "Doe",
                phoneNumber: "123-456-7890",
                weight: 75,
                height: 180,
                dateOfBirth: new Date("1980-01-01"),
                gender: "male",
                address: "123 Main St, Anytown, USA",
                avatar: "john_avatar.png"
            },
            mskProblem: ["back pain", "knee pain"]
        },
        {
            username: "jane_smith",
            password: "$2a$13$zBo509bAuzSQysIxqchoB..BareVtNvdoWqoqar/xD3Vc1HgwEMFO",
            role: "patient",
            userProfile: {
                firstName: "Jane",
                lastName: "Smith",
                phoneNumber: "987-654-3210",
                weight: 65,
                height: 165,
                dateOfBirth: new Date("1990-05-15"),
                gender: "female",
                address: "456 Elm St, Othertown, USA",
                avatar: "jane_avatar.png"
            },
            mskProblem: ["shoulder pain"]
        },
    ];

    async findOne(username: string): Promise<Iuser | undefined> {
        return this.users.find(user => user.username === username);
    }
}
