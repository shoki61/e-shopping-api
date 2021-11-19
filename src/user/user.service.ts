import { Injectable } from '@nestjs/common';

@Injectable()
export class UserService {
  private users = [];
  createUser(dto: any) {
    return this.users.push(dto);
  }
}
