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
    async getUserById(@Param('id', ParseObjectIdPipe) id: string) {
        return await this.usersService.findById(id);
    }

    @Patch(':id')
    @HttpCode(HttpStatus.OK)
    async updateUserById(@Param('id', ParseObjectIdPipe) id: string, @Body() updateUserDto: UpdateUserDto) {
        return await this.usersService.update(id, updateUserDto);
    }

    @Delete(':id')
    @HttpCode(HttpStatus.NO_CONTENT)
    async deleteUserById(@Param('id', ParseObjectIdPipe) id: string) {
        return await this.usersService.delete(id);
    }
}
