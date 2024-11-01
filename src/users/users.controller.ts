import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Patch } from '@nestjs/common';
import { UsersService } from './users.service';
import { Public } from 'src/common/decorators/publicAPI.decorator';
import { ParseObjectIdPipe } from 'src/common/pipes/parse-object-id.pipe';
import { UpdateUserDto } from './dto/user.dto';

@Controller('users')
export class UsersController {
    constructor(private readonly usersService: UsersService) {}
    
    @Get()
    @HttpCode(HttpStatus.OK)
    async getAllUsers() {
        return await this.usersService.findAll();
    }

    @Get(':id')
    @Public()
    @HttpCode(HttpStatus.OK)
    getUserById(@Param('id', ParseObjectIdPipe) id: string) {
        return this.usersService.findById(id);
    }

    @Patch(':id')
    @HttpCode(HttpStatus.OK)
    updateUserById(@Param('id', ParseObjectIdPipe) id: string, @Body() updateUserDto: UpdateUserDto) {
        return this.usersService.update(id, updateUserDto);
    }

    @Delete(':id')
    @HttpCode(HttpStatus.NO_CONTENT)
    deleteUserById(@Param('id', ParseObjectIdPipe) id: string) {
        return this.usersService.delete(id);
    }
}
