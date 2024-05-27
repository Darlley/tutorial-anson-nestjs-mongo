import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  Param,
  Patch,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { isValidObjectId } from 'mongoose';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  @UsePipes(new ValidationPipe())
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @Get()
  findAll() {
    return this.usersService.findAll();
  }

  @Get(':id')
  // @UseGuards(IsMongoIdValidGuard)
  // @IsMongoIdValid('id')
  async findOne(@Param('id') id: string) {
    if (!isValidObjectId(id)) throw new HttpException('User not found', 404);

    const user = await this.usersService.findOne(id);
    if (!user) throw new HttpException('User not found', 404);
    return user;
  }

  @Patch(':id')
  @UsePipes(new ValidationPipe())
  async update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    if (!isValidObjectId(id)) throw new HttpException('Invalid User ID', 400);
    const updatedUser = await this.usersService.update(id, updateUserDto);
    if (!updatedUser) throw new HttpException('User not found', 404);
    return updatedUser;
  }

  @Delete(':id')
  @UsePipes(new ValidationPipe())
  async remove(@Param('id') id: string) {
    if (!isValidObjectId(id)) throw new HttpException('Invalid User ID', 400);
    const deletedUser = await this.usersService.remove(id);
    if (!deletedUser) throw new HttpException('User not found', 404);
    return;
  }
}
