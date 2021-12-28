import { IsBoolean, IsEmail, IsString } from 'class-validator';

class User {
  @IsString()
  name: string;

  @IsEmail()
  email: string;

  @IsString()
  password: string;

  @IsBoolean()
  emailVerified: boolean;
}
