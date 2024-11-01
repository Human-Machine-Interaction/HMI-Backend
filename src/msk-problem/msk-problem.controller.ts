import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Patch, Post } from '@nestjs/common';
import { MskProblemService } from './msk-problem.service';
import { ParseObjectIdPipe } from 'src/common/pipes/parse-object-id.pipe';
import { CreateMskProblemDto, UpdateMskProblemDto } from './dto/msk-problem.dto';
import { Public } from 'src/common/decorators/publicAPI.decorator';

@Controller('msk-problem')
export class MskProblemController {
    constructor(private readonly mskProblemService:MskProblemService) {}

    @Get()
    @HttpCode(HttpStatus.OK)
    @Public()
    getAllMskProblems() {
        return this.mskProblemService.findAll();
    }

    @Get(':id')
    @HttpCode(HttpStatus.OK)
    @Public()
    getMskProblemById(@Param('id',ParseObjectIdPipe) id: string) {
        return this.mskProblemService.findById(id);
    }

    @Post()
    createMskProblem(@Body() createMskProblemDto: CreateMskProblemDto) {
        return this.mskProblemService.create(createMskProblemDto);
    }

    @Patch(':id')
    updateMskProblem(@Param('id',ParseObjectIdPipe) id: string, @Body() updateMskProblemDto: UpdateMskProblemDto) {
        return this.mskProblemService.update(id, updateMskProblemDto);
    }

    @Delete(':id')
    deleteMskProblem(@Param('id',ParseObjectIdPipe) id: string) {
        return this.mskProblemService.delete(id);
    }
}
