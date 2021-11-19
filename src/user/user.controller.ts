import { Body, Controller, Post } from '@nestjs/common';

import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @Post('sign_up')
  signUp(@Body() dto: any) {
    return this.userService.createUser(dto);
  }
}
