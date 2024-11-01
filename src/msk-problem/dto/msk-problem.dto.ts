import { IsOptional, ValidateNested } from "class-validator";
import { IPrescription } from "../interfaces/msk-problem.interface";
import { Type } from "class-transformer";

export class CreateMskProblemDto {
    @IsOptional()
    bodyPart: string;

    @IsOptional()
    injury: string;

    @IsOptional()
    levelOfPain: string;

    @IsOptional()
    doctorNotes: string;
    
    @ValidateNested()
    @IsOptional()
    @Type(() => PrescriptionDto)
    prescription: IPrescription;
}

class PrescriptionDto implements IPrescription {
    @IsOptional()
    name: string;

    @IsOptional()
    amount: string;

    @IsOptional()
    frequency: string;
}

export class UpdateMskProblemDto extends CreateMskProblemDto {}