import { Body, Controller, Post, Query, UsePipes, ValidationPipe } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { AuthService } from "./auth.service";
import { LoginDto } from "./dtos/login.dto";
import { SignUpDto } from "./dtos/signUp.dto";

@Controller('/auth')
export class AuthController {
  constructor(private authService: AuthService) {
  }

  @Post('/signup')
  @UsePipes(ValidationPipe)
  async signUp(
    @Body() signUpDto: SignUpDto
  ):Promise<any> {
    return this.authService.signUp(signUpDto);
  }

  @Post('/login')
  @UsePipes(ValidationPipe)
  async signIn(
    @Body() loginDto: LoginDto
  ):Promise<any> {
    return this.authService.login(loginDto);
  }
}