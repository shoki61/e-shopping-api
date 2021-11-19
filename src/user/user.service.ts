import { Injectable } from '@nestjs/common';

import { SignUpDto } from './dto/SignUpDto';

@Injectable()
export class UserService {
  private users = [];
  createUser(userDto: SignUpDto) {
    return this.users.push(userDto);
  }
}
