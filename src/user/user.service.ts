import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { LoginDto } from './dto/LoginDto';
import { SignUpDto } from './dto/SignUpDto';
import { User, UserDocument } from './schemas';
import { sendVerificationCode } from '../mailer';

@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  generateVerificationCode = () =>
    Math.random().toString(36).substring(2, 8).toUpperCase();

  async createUser(userDto: SignUpDto) {
    const existingEmail = await this.userModel.findOne({
      email: userDto.email,
    });
    if (existingEmail) {
      throw new HttpException('existEmail', HttpStatus.BAD_REQUEST);
    }
    const code = await this.generateVerificationCode();
    const [mail, user] = await Promise.all([
      sendVerificationCode(userDto.email, code),
      this.userModel.create({ ...userDto, verificationCode: code }),
    ]);
    if (!mail) {
      throw new HttpException('mailError', HttpStatus.BAD_REQUEST);
    }
    if (!user) {
      throw new HttpException('userError', HttpStatus.BAD_REQUEST);
    }
    return user;
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

  async verifyEmail(email: string, verificationCode: string) {
    const user = await this.userModel.findOne({ email });
    if (!user) {
      throw new HttpException('userNotFound', HttpStatus.NOT_FOUND);
    }
    if (verificationCode !== user.verificationCode) {
      throw new HttpException(
        'verificationCodeIsIncorrect',
        HttpStatus.BAD_REQUEST,
      );
    }
    user.emailVerified = true;
    user.verificationCode = '';
    await user.save();
    return user;
  }
}
