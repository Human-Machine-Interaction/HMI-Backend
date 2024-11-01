import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { MskProblem } from './schemas/msk-problem.schema';
import { CreateMskProblemDto, UpdateMskProblemDto } from './dto/msk-problem.dto';

@Injectable()
export class MskProblemService {
    constructor(
        @InjectModel(MskProblem.name) private mskProblemModel: Model<MskProblem>,
    ) { }

    async findAll(): Promise<MskProblem[]> {
        return this.mskProblemModel.find().exec();
    }

    async findById(id: string): Promise<MskProblem> {
        const mskProblem = await this.mskProblemModel.findById(id).exec();
        if (!mskProblem) {
            throw new Error('MSK Problem not found');
        }
        return mskProblem;
    }

    async create(createMskProblemDto: CreateMskProblemDto): Promise<MskProblem> {
        const createdMskProblem = new this.mskProblemModel(createMskProblemDto);
        return createdMskProblem.save();
    }

    async update(id: string, updateMskProblemDto: UpdateMskProblemDto): Promise<MskProblem> {
        const newMskProblem = await this.mskProblemModel.findByIdAndUpdate(id, updateMskProblemDto, { new: true }).exec();
        if (!newMskProblem) {
            throw new Error('MSK Problem not found');
        }
        return newMskProblem;
    }

    async delete(id: string) {
        const deletedMskProblem = await this.mskProblemModel.findByIdAndDelete(id).exec();
        if (!deletedMskProblem) {
            throw new Error('MSK Problem not found');
        }
    }
}
