import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { LoginUserDto } from '../users/dto/login-user.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('signup')
  signUpUser(@Body() signUpDto: CreateUserDto) {
    return this.authService.signUpUser(signUpDto);
  }

  @Post('login')
  login(@Body() loginDto: LoginUserDto) {
    return this.authService.loginUser(loginDto);
  }
}
