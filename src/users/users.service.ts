import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

// SCHEMA
import { Post } from 'src/schemas/post.schema';
import { UserSettings } from 'src/schemas/user-settings.schema';
import { User } from 'src/schemas/user.schema';

// DTO
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name) private userModel: Model<User>,
    @InjectModel(UserSettings.name)
    private userSettingsModel: Model<UserSettings>,
    @InjectModel(Post.name) private postModel: Model<Post>,
  ) {}

  async create({ settings, ...createUserDto }: CreateUserDto) {
    console.log('UsersService@create');

    if (settings) {
      const newSettings = await new this.userSettingsModel(settings).save();
      return await new this.userModel({
        ...createUserDto,
        settings: newSettings._id,
      }).save();
    }

    return new this.userModel(createUserDto).save();
  }

  async findAll(): Promise<User[]> {
    console.log('UsersService@findAll');
    return this.userModel.find().populate(['settings', 'posts']);
  }

  findOne(id: string) {
    console.log('UsersService@findOne');
    return this.userModel.findById(id).populate(['settings', 'posts']);
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
