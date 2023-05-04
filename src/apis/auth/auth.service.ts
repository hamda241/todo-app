import { BadRequestException, Inject, Injectable, UnauthorizedException } from "@nestjs/common";
import { LoginDto } from "./dtos/login.dto";
import { Model } from "mongoose";
import {UserInterface} from "./interfaces/user.interface";
import { InjectModel } from "@nestjs/mongoose";
import { ErrorMessage } from "../../constants/error-msgs";
import { SignUpDto } from "./dtos/signUp.dto";
import * as bcrypt from "bcrypt";
import { JwtPayload } from "./interfaces/jwt-payload.interface";
import { JwtService } from "@nestjs/jwt";
import { ResponseModel } from "../../model/response.model";

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService
    ,
    @InjectModel('user')
    private readonly userRepo: Model<UserInterface>,)
  {}

  async login(loginDto:LoginDto){
    const user = await this.userRepo.findOne({email:loginDto.email});

    if(!user)
    {
      throw  new UnauthorizedException(ErrorMessage.USER_DOES_NOT_EXIST);
    }

    const isMatch = await bcrypt.compare(loginDto.password, user.password);

    if (!isMatch) {
      throw new UnauthorizedException(ErrorMessage.INVALID_CREDENTIALS);
    }

    const userId = user.id;
    const payload: JwtPayload = { userId };
    const accessToken = this.jwtService.sign(payload, {
      expiresIn: 3600,
      secret: process.env.JWT_SECRET
    });

    await user.save();
    const responseModel = new ResponseModel();
    responseModel.success = true;
    responseModel.message = 'User logged in successfully';
    responseModel.data = { user, accessToken};
    return responseModel;
  }

  async signUp(signUpDto:SignUpDto):Promise<ResponseModel>{
    const found = await this.userRepo.findOne(
     { email: signUpDto.email });

    if (found) {
      throw new BadRequestException(ErrorMessage.USER_ALREADY_EXISTS);
    }

    const user = new this.userRepo(signUpDto);
    const { password } = signUpDto;

    const salt = await bcrypt.genSalt();
    user.password = await bcrypt.hash(password, salt);
    await user.save();

    const userId = user.id;
    const payload: JwtPayload = { userId };
    const accessToken = this.jwtService.sign(payload, {
      expiresIn: 3600,
      secret: process.env.JWT_SECRET
    });

    const responseModel = new ResponseModel();
    responseModel.success = true;
    responseModel.message = 'User registered successfully';
    responseModel.data = { user,accessToken };
    return responseModel;
  }
}