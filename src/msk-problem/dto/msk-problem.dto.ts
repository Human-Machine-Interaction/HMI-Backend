import { IsIn, IsInt, IsOptional, IsString, Min, ValidateNested } from "class-validator";
import { IPrescription } from "../interfaces/msk-problem.interface";
import { Type } from "class-transformer";
import { ApiProperty } from "@nestjs/swagger";

export class CreateMskProblemDto {

    @ApiProperty()
    @IsOptional()
    bodyPart: string;

    @ApiProperty()
    @IsOptional()
    injury: string;

    @ApiProperty()
    @IsOptional()
    levelOfPain: string;

    @ApiProperty()
    @IsOptional()
    doctorNotes: string;

    @ApiProperty()
    @ValidateNested()
    @IsOptional()
    @Type(() => PrescriptionDto)
    prescription: IPrescription;
}

class PrescriptionDto implements IPrescription {
    @ApiProperty()
    @IsOptional()
    name: string;

    @ApiProperty()
    @IsOptional()
    amount: string;

    @ApiProperty()
    @IsOptional()
    frequency: string;
}

export class MskProblemQueryDto {
    @IsOptional()
    @Type(() => Number)
    @IsInt()
    @Min(1)
    @ApiProperty({ required: false, default: 1 })
    page?: number = 1;

    @IsOptional()
    @Type(() => Number)
    @IsInt()
    @Min(1)
    @ApiProperty({ required: false, default: 10 })
    limit?: number = 10;

    @IsOptional()
    @IsString()
    @ApiProperty({ required: false })
    sortField?: string;

    @IsOptional()
    @IsIn(['asc', 'desc'])
    @ApiProperty({ required: false, enum: ['asc', 'desc'], default: 'asc' })
    sortOrder?: 'asc' | 'desc' = 'asc';
}

export class UpdateMskProblemDto extends CreateMskProblemDto { }