import { Body, Controller, Post } from '@nestjs/common';

import { UserService } from './user.service';
import { SignUpDto } from './dto/SignUpDto';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @Post('sign_up')
  signUp(@Body() userDto: SignUpDto) {
    return this.userService.createUser(userDto);
  }
}
