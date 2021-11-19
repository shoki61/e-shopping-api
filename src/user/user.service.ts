import { Injectable } from '@nestjs/common';
import { LoginDto } from './dto/LoginDto';

import { SignUpDto } from './dto/SignUpDto';

@Injectable()
export class UserService {
  private users = [];

  createUser(userDto: SignUpDto) {
    return this.users.push(userDto);
  }

  login(userDto: LoginDto) {
    return;
  }
}
