
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './schemas/user.schema';
import { Model } from 'mongoose';
import { CreateUserDto, UpdateUserDto } from './dto/user.dto';


@Injectable()
export class UsersService {
    constructor(
        @InjectModel(User.name) private userModel: Model<User>,
    ) { }

    async create(createUserDto: CreateUserDto): Promise<User> {
        const createdUser = new this.userModel(createUserDto);
        return createdUser.save();
    }

    async findAll(): Promise<User[]> {
        return this.userModel.find().exec();
    }

    async findById(id: string): Promise<User> {
        const user = await this.userModel.findById(id).exec();
        if (!user) {
            throw new NotFoundException("user with this id not found");
        }
        return user
    }

    async findOne(username: string): Promise<User> {
        const user = await this.userModel.findOne({ username }).select('+password').exec();
        if (!user) {
            throw new NotFoundException("user with this username not found");
        }
        return user;
    }

    async update(id: string, updateUserDto: UpdateUserDto): Promise<User> {
        const newUser = await this.userModel.findByIdAndUpdate(id, updateUserDto,
            {
                new: true,
                runValidators: true,
            }
        ).exec();

        if (!newUser) {
            throw new NotFoundException("user with this id not found");
        }
        return newUser;
    }

    async delete(id: string) {
        const user = await this.userModel.findByIdAndDelete(id).exec();
        if (!user) {
            throw new NotFoundException("user with this id not found");
        }
    }
}
