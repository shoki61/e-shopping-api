import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { LoginDto } from './dto/LoginDto';
import { SignUpDto } from './dto/SignUpDto';
import { User, UserDocument } from './schemas';

@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  async createUser(userDto: SignUpDto) {
    const existingEmail = await this.userModel.findOne({
      email: userDto.email,
    });
    if (existingEmail) {
      throw new HttpException('existEmail', HttpStatus.BAD_REQUEST);
    }
    return this.userModel.create({ ...userDto });
  }

  async login(userDto: LoginDto) {
    const user = await this.userModel.findOne({ email: userDto.email });
    if (!user) {
      throw new HttpException('notUser', HttpStatus.BAD_REQUEST);
    }
    if (user.password !== userDto.password) {
      throw new HttpException('passwordIncorrect', HttpStatus.BAD_REQUEST);
    }
    return user;
  }
}
