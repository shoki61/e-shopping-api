import { Body, Controller, Param, Post } from '@nestjs/common';

import { UserService } from './user.service';
import { SignUpDto } from './dto/SignUpDto';
import { LoginDto } from './dto/LoginDto';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @Post('sign_up')
  signUp(@Body() userDto: SignUpDto) {
    return this.userService.createUser(userDto);
  }

  @Post('login')
  login(@Body() userDto: LoginDto) {
    return this.userService.login(userDto);
  }

  @Post('verify_email/:email/:verificationCode')
  verifyEmail(
    @Param('email') email: string,
    @Param('verificationCode') verificationCode: string,
  ) {
    return this.userService.verifyEmail(email, verificationCode);
  }
}
