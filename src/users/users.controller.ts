import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Patch, Query } from '@nestjs/common';
import { UsersService } from './users.service';
import { ParseObjectIdPipe } from 'src/common/pipes/parse-object-id.pipe';
import { UpdateUserDto, UserQueryDto } from './dto/user.dto';
import { ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiBearerAuth()
@ApiTags('Users')
@Controller('users')
export class UsersController {
    constructor(private readonly usersService: UsersService) {}
    
    @Get()
    @ApiResponse({ status: 200, description: 'get all user document' })
    @ApiResponse({ status: 401, description: 'Unauthorized' })
    @HttpCode(HttpStatus.OK)
    async getAllUsers(@Query() userQueryDto: UserQueryDto) {
        return await this.usersService.findAll(userQueryDto);
    }

    @Get(':id')
    @ApiResponse({ status: 200, description: 'get user by specific id' })
    @ApiResponse({ status: 401, description: 'Unauthorized' })
    @HttpCode(HttpStatus.OK)
    getUserById(@Param('id', ParseObjectIdPipe) id: string) {
        return this.usersService.findById(id);
    }

    @Patch(':id')
    @ApiResponse({ status: 200, description: 'update a user' })
    @ApiResponse({ status: 401, description: 'Unauthorized' })
    @HttpCode(HttpStatus.OK)
    updateUserById(@Param('id', ParseObjectIdPipe) id: string, @Body() updateUserDto: UpdateUserDto) {
        return this.usersService.update(id, updateUserDto);
    }

    @Delete(':id')
    @ApiResponse({ status: 200, description: 'delete a user' })
    @ApiResponse({ status: 401, description: 'Unauthorized' })
    @HttpCode(HttpStatus.NO_CONTENT)
    deleteUserById(@Param('id', ParseObjectIdPipe) id: string) {
        return this.usersService.delete(id);
    }
}
