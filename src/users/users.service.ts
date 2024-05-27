import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from 'src/schemas/user.schema';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

  create(createUserDto: CreateUserDto) {
    console.log('UsersService@create');
    return new this.userModel(createUserDto).save();
  }

  findAll() {
    console.log('UsersService@findAll');
    return this.userModel.find();
  }

  findOne(id: string) {
    console.log('UsersService@findOne');
    return this.userModel.findById(id);
  }
  
  update(id: string, updateUserDto: UpdateUserDto) {
    console.log('UsersService@update');
    return this.userModel.findByIdAndUpdate(id, updateUserDto, { new: true });
  }
  
  remove(id: string) {
    console.log('UsersService@remove');
    return this.userModel.findByIdAndDelete(id);
  }
}
