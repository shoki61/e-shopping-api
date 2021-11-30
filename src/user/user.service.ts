import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt';

import { LoginDto } from './dto/LoginDto';
import { SignUpDto } from './dto/SignUpDto';
import { User, UserDocument } from './schemas';
import { sendVerificationCode } from '../mailer';

@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  generateVerificationCode = () =>
    Math.random().toString(36).substring(2, 8).toUpperCase();

  async createUser({ email, password, name }: SignUpDto) {
    const existingEmail = await this.userModel.findOne({ email });

    if (existingEmail) {
      throw new HttpException('existEmail', HttpStatus.BAD_REQUEST);
    }
    const hash = await bcrypt.hash(password, 10);
    const code = await this.generateVerificationCode();

    const [mail, user] = await Promise.all([
      sendVerificationCode(email, code),
      this.userModel.create({
        name,
        email,
        password: hash,
        verificationCode: code,
      }),
    ]);

    if (!user) {
      throw new HttpException('userError', HttpStatus.BAD_REQUEST);
    }

    if (!mail) {
      throw new HttpException('mailError', HttpStatus.BAD_REQUEST);
    }
    return user;
  }

  async login({ email, password }: LoginDto) {
    const user = await this.userModel.findOne({ email });
    if (!user) {
      throw new HttpException('notUser', HttpStatus.BAD_REQUEST);
    }
    const isPasswordMatched = await bcrypt.compare(password, user.password);
    if (!isPasswordMatched) {
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

  async getAllUsers() {
    const users = await this.userModel.find({});
    return users;
  }
}
