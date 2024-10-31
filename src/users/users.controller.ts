import { Controller, Get, HttpCode, HttpStatus, Param } from '@nestjs/common';
import { UsersService } from './users.service';
import { Public } from 'src/common/decorators/publicAPI.decorator';
import { ParseObjectIdPipe } from 'src/common/pipes/parse-object-id.pipe';

@Controller('users')
export class UsersController {
    constructor(private readonly usersService: UsersService) {}
    
    @Get(':id')
    @Public()
    @HttpCode(HttpStatus.OK)
    async getUserById(@Param('id', ParseObjectIdPipe) id: string) {
        return await this.usersService.findById(id);
    }
}
