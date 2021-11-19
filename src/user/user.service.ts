import { Injectable } from '@nestjs/common';
import { LoginDto } from './dto/LoginDto';

import { SignUpDto } from './dto/SignUpDto';

@Injectable()
export class UserService {
  createUser(userDto: SignUpDto) {
    return;
  }

  login(userDto: LoginDto) {
    return;
  }
}
